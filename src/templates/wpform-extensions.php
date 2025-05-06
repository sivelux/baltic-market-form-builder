
<?php
/**
 * WP Form Lite Extensions for Jarmark Bałtycki Form
 * Save this file in your WordPress theme's functions.php or as a separate plugin
 */

// Don't allow direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add custom validation for Polish postal code format (XX-XXX)
 */
function jarmark_validate_postal_code($field_id, $field_submit, $form_data) {
    // Check if it's the postal code field (adjust the ID if needed)
    if ($form_data['fields'][$field_id]['type'] == 'text' && 
        strpos($form_data['fields'][$field_id]['label'], 'Kod pocztowy') !== false) {
        
        // Validate Polish postal code format XX-XXX
        if (!preg_match('/^\d{2}-\d{3}$/', $field_submit)) {
            wpforms()->process->errors[$form_data['id']][$field_id] = 'Kod pocztowy musi być w formacie XX-XXX';
        }
    }
    
    return $field_submit;
}
add_filter('wpforms_process_filter', 'jarmark_validate_postal_code', 10, 3);

/**
 * Add custom validation for NIP (10 digits)
 */
function jarmark_validate_nip($field_id, $field_submit, $form_data) {
    // Check if it's the NIP field (adjust the ID if needed)
    if ($form_data['fields'][$field_id]['type'] == 'text' && 
        strpos($form_data['fields'][$field_id]['label'], 'NIP') !== false) {
        
        // Remove all non-digits
        $digits_only = preg_replace('/\D/', '', $field_submit);
        
        // Validate NIP format (10 digits)
        if (strlen($digits_only) !== 10) {
            wpforms()->process->errors[$form_data['id']][$field_id] = 'NIP musi składać się z 10 cyfr';
        }
    }
    
    return $field_submit;
}
add_filter('wpforms_process_filter', 'jarmark_validate_nip', 10, 3);

/**
 * Format submission data before sending emails
 */
function jarmark_format_email_data($fields, $entry, $form_data, $notification_id) {
    foreach ($fields as $id => $field) {
        // Format boolean values to TAK/NIE
        if (isset($field['type']) && $field['type'] === 'checkbox') {
            $fields[$id]['value'] = $field['value'] ? 'TAK' : 'NIE';
        }
    }
    
    return $fields;
}
add_filter('wpforms_email_data', 'jarmark_format_email_data', 10, 4);

/**
 * Add custom CSS for the form
 */
function jarmark_form_custom_css() {
    ?>
    <style>
        /* Form container styling */
        .wpforms-container {
            max-width: 960px;
            margin: 0 auto;
            font-family: 'Arial', sans-serif;
        }
        
        /* Section styling */
        .wpforms-field-container h3 {
            font-size: 1.5rem;
            color: #1b6ec2; /* Baltic blue */
            margin: 2rem 0 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e2e8f0;
        }
        
        /* Field styling */
        .wpforms-field {
            margin-bottom: 1.25rem !important;
        }
        
        /* Label styling */
        .wpforms-field-label {
            font-weight: 600 !important;
            margin-bottom: 0.5rem !important;
        }
        
        /* Submit button styling */
        .wpforms-submit {
            background-color: #1b6ec2 !important; /* Baltic blue */
            color: white !important;
            padding: 0.75rem 2rem !important;
            font-size: 1.125rem !important;
            border-radius: 0.375rem !important;
            transition: background-color 0.3s !important;
        }
        
        .wpforms-submit:hover {
            background-color: #f97316 !important; /* Baltic orange */
        }
        
        /* Error styling */
        .wpforms-error {
            color: #dc2626 !important;
            font-size: 0.875rem !important;
            margin-top: 0.25rem !important;
        }
        
        /* Map download link */
        .map-download-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 700;
            font-size: 1.125rem;
            color: #1b6ec2;
            text-decoration: underline;
            margin-bottom: 1rem;
            transition: color 0.3s;
        }
        
        .map-download-link:hover {
            color: #f97316;
        }
        
        /* Event schedule section */
        .event-schedule {
            margin-top: 3rem;
            padding: 1.5rem;
            background-color: #f8fafc;
            border-radius: 0.375rem;
            border-left: 4px solid #1b6ec2;
        }
    </style>
    <?php
}
add_action('wpforms_frontend_css', 'jarmark_form_custom_css');

/**
 * Process form data after submission for additional actions
 */
function jarmark_process_form_submission($fields, $entry, $form_data, $entry_id) {
    // Ensure this is our specific form
    if ($form_data['id'] != YOUR_FORM_ID) { // Replace YOUR_FORM_ID with the actual form ID
        return;
    }
    
    // Get submission date and time
    $submission_date = current_time('Y-m-d H:i:s');
    
    // Here you can add additional processing:
    // 1. Log submissions to a custom database table
    // 2. Send data to an external API
    // 3. Generate PDF confirmation
    // 4. Set up automated follow-up emails
    // Etc.
    
    // Example of logging to file (for development only)
    if (defined('WP_DEBUG') && WP_DEBUG === true) {
        $log_data = array(
            'date' => $submission_date,
            'entry_id' => $entry_id,
            'fields' => $fields
        );
        
        error_log('Form submission: ' . print_r($log_data, true));
    }
}
add_action('wpforms_process_complete', 'jarmark_process_form_submission', 10, 4);

/**
 * Add custom export columns to WPForms entries export
 */
function jarmark_custom_export_columns($columns, $form_data) {
    // Add submission date as the first column
    $new_columns = array(
        'submission_date' => 'Data i godzina zgłoszenia'
    );
    
    return array_merge($new_columns, $columns);
}
add_filter('wpforms_export_get_export_columns', 'jarmark_custom_export_columns', 10, 2);

/**
 * Populate custom export columns with data
 */
function jarmark_populate_export_columns($value, $entry, $column_id, $form_data) {
    if ($column_id === 'submission_date') {
        $value = isset($entry['date']) ? $entry['date'] : '';
    }
    
    return $value;
}
add_filter('wpforms_export_get_export_field_value', 'jarmark_populate_export_columns', 10, 4);
