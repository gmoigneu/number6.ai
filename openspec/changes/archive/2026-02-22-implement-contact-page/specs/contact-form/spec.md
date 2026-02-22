## ADDED Requirements

### Requirement: Contact form fields
The contact form SHALL include the following fields:
- **Name** (text input, required)
- **Email** (email input, required)
- **Company name** (text input, optional)
- **Company size** (dropdown select, optional) — options: "Just me", "2–10", "11–50", "51–200", "200+"
- **Interest checkboxes** (multi-select, optional) — options: "Training & workshops", "AI strategy", "Custom AI solutions", "Ongoing partnership", "Not sure yet"
- **Message** (textarea, optional) — placeholder describing what to write
- **How did you hear about us?** (dropdown select, optional) — options: "Select...", "Google search", "LinkedIn", "Referral", "Social media", "Event / conference", "Other"

#### Scenario: All form fields render
- **WHEN** the contact form section loads
- **THEN** all 7 form fields are visible with correct labels, input types, and placeholder text

#### Scenario: Required field indicators
- **WHEN** the form renders
- **THEN** the Name and Email fields show asterisk indicators in their labels

### Requirement: Client-side form validation
The form SHALL validate required fields before submission:
- Name must not be empty
- Email must be a valid email format
Validation errors SHALL display as inline messages below the respective field.

#### Scenario: Submit with empty required fields
- **WHEN** a user clicks "SEND MESSAGE" with name or email empty
- **THEN** the form does not submit and inline error messages appear below the empty required fields

#### Scenario: Submit with invalid email
- **WHEN** a user clicks "SEND MESSAGE" with an invalid email format
- **THEN** the form does not submit and an error message appears below the email field

#### Scenario: Errors clear on input
- **WHEN** a user types into a field that has a validation error
- **THEN** the error message for that field disappears

### Requirement: Web3Forms submission
The form SHALL submit data via a JSON POST request to `https://api.web3forms.com/submit` with the access key `9fdad137-5a11-472b-9fe0-cb423b0a51bd`. The submission SHALL include all filled form fields.

#### Scenario: Successful form submission
- **WHEN** a user fills in valid name and email and clicks "SEND MESSAGE"
- **THEN** the form sends a POST request to Web3Forms, the submit button shows a loading state during submission, and a success message replaces the form on success

#### Scenario: Failed form submission
- **WHEN** the Web3Forms API returns an error or is unreachable
- **THEN** an error message is displayed with a fallback instruction to email hello@number6.ai directly, and the form remains editable for retry

### Requirement: Submit button states
The submit button SHALL have three visual states:
1. **Default**: "SEND MESSAGE →" in terracotta background
2. **Loading**: Disabled with a loading indicator while the request is in flight
3. **Success**: The entire form section transitions to a thank-you message

#### Scenario: Loading state during submission
- **WHEN** the form is submitting
- **THEN** the submit button is disabled and shows a loading indicator

#### Scenario: Success state after submission
- **WHEN** submission succeeds
- **THEN** the form is replaced with a success message thanking the user

### Requirement: Interest checkbox toggle behavior
The interest checkboxes SHALL behave as toggleable chips. Multiple options can be selected. Selected options SHALL display with a terracotta background and border. Unselected options SHALL display with a dark border only.

#### Scenario: Select an interest
- **WHEN** a user clicks an unselected interest option
- **THEN** that option visually changes to the selected state (terracotta background)

#### Scenario: Deselect an interest
- **WHEN** a user clicks a selected interest option
- **THEN** that option visually changes back to the unselected state (dark border only)

#### Scenario: Multiple interests selected
- **WHEN** a user selects multiple interest options
- **THEN** all selected options show the selected state simultaneously

### Requirement: Form section styling
The contact form section SHALL use a dark background (#1A1A1A) with:
- A "SEND US A MESSAGE" terracotta label
- Headline: "We're great readers."
- Descriptive subtext
- Form inputs with dark background (#2A2A2A) and appropriate contrast for labels and placeholder text

#### Scenario: Dark theme form section
- **WHEN** the contact form section renders
- **THEN** the section has a dark background with correctly contrasted labels, inputs, and text
