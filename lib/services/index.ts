/**
 * Services Index
 * Central export point for all API services
 */

import * as authService from './auth.service';
import * as userService from './user.service';
import * as ledgerService from './ledger.service';
import * as invoicesService from './invoices.service';
import * as customersService from './customers.service';
import * as productsService from './products.service';
import * as paymentsService from './payments.service';

export {
    authService,
    userService,
    ledgerService,
    invoicesService,
    customersService,
    productsService,
    paymentsService,
};

// Default export for convenience
export default {
    auth: authService,
    user: userService,
    ledger: ledgerService,
    invoices: invoicesService,
    customers: customersService,
    products: productsService,
    payments: paymentsService,
};
