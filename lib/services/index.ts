/**
 * Services Index
 * Central export point for all API services
 */

import * as authService from './auth.service';
import * as userService from './user.service';
import * as ledgerService from './ledger.service';
import * as invoicesService from './invoices.service';
import * as customersService from './customers.service';

export {
    authService,
    userService,
    ledgerService,
    invoicesService,
    customersService,
};

// Default export for convenience
export default {
    auth: authService,
    user: userService,
    ledger: ledgerService,
    invoices: invoicesService,
    customers: customersService,
};
