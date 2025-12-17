# Form Validation System - Setup Instructions

## Installation Status

The following packages need to be installed:

\`\`\`bash
npm install react-hook-form zod
\`\`\`

For @hookform/resolvers, run separately:
\`\`\`bash
npm install @hookform/resolvers
\`\`\`

## Quick Start

1. Install dependencies (if not already done)
2. Import and use in your forms:

\`\`\`tsx
import { Form, FormField, PANInput } from '@/components/forms';
import { customerFormSchema } from '@/lib/validations/forms';

<Form schema={customerFormSchema} onSubmit={handleSubmit}>
    <FormField name="pan" label="PAN Card">
        <PANInput name="pan" />
    </FormField>
</Form>
\`\`\`

See CustomerForm.tsx for complete example!
