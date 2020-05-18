/* eslint-disable linebreak-style */
import qs from 'qs';
import request from './request';

const getQueryString = (qry) => {
  let query = '';
  if (typeof qry === 'string') {
    query += qry;
  } else if (qry) {
    query += qs.stringify(qry);
  }
  return query ? `?${query}` : '';
};

export default class BillwerkAPI {
  static request = request

  getApiUrl(short = false) {
    return `http${this.useHttps ? 's' : ''}://${this.billwerkHost}${!short ? this.apiPath : ''}`;
  }

  checkAuth(force = false) {
    if (this.authToken && !force) {
      return new Promise(r => r(this.authToken));
    }
    return BillwerkAPI.request(`${this.getApiUrl(true)}/oauth/token`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      auth: { user: this.clientId, pass: this.clientSecret },
    }).then((data) => {
      this.authToken = data.access_token;
      return this.authToken;
    });
  }

  call(action, method = 'GET', options = {}, skip, take = 500, oldData = []) {
    return this.checkAuth()
      .then((token) => {
        const headers = Object.assign({}, options.headers, {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        });
        const queryString = getQueryString(options.query);
        let tmpQuery = queryString ? `${queryString}&` : '?';
        tmpQuery += skip ? `skip=${skip}&take=${take}` : `take=${take}`;
        return BillwerkAPI.request(this.getApiUrl() + action + tmpQuery, {
          method,
          headers,
          body: options.data,
        });
      })
      .then((data) => {
        if (!Array.isArray(data)) return data;
        if (!data || !data.length) return oldData;
        const idExists = !!oldData.filter(item => item.Id === data[0].Id).length;
        if (idExists) return oldData;
        if (data.length >= take) {
          return this.call(action, method, options, (skip || 0) + 500, take, oldData.concat(data));
        }
        return oldData.concat(data);
      });
  }

  /**
   * Constructor
   * @param {string} clientId Client ID, found in /settings/oauth-clients
   * @param {string} clientSecret Client Secret, found in /settings/oauth-clients
   * @param {string} billwerkHost Billwerk Host 'sandbox.billwerk.com' (default)
   *  or 'app.billwerk.com'
   * @param {string} apiPath '/api/v1' (default)
   */
  constructor(clientId, clientSecret, billwerkHost = 'sandbox.billwerk.com', apiPath = '/api/v1', useHttps = true) {
    this.events = {};
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.billwerkHost = billwerkHost;
    this.apiPath = apiPath;
    this.useHttps = useHttps;
  }

  // /Orders
  /**
   * Create a new plan/component subscription or up/downgrade order
   * @param {*} data OrderDTO
   */
  createOrder(data) {
    return this.call('/Orders/', 'POST', { data });
  }

  // /Orders/:OrderId/Commit
  /**
   * Process and finalize an order
   * @param {string} orderId Order ID
   * @param {*} data OrderCommitDTO
   */
  commitOrder(orderId, data) {
    return this.call(`/Orders/${orderId}/commit`, 'POST', { data });
  }

  // /Orders/{id}/approve
  /**
   * [FEATURE] Approve an order
   * @param {string} orderId Order ID
   */
  approveOrder(orderId) {
    return this.call(`/Orders/${orderId}/approve`, 'POST');
  }

  // /Orders/{id}/decline
  /**
   * [FEATURE] Decline an order
   * @param {string} orderId Order ID
   */
  declineOrder(orderId) {
    return this.call(`/Orders/${orderId}/decline`, 'POST');
  }

  // /Customers
  /**
   * Retrieve a list of all customers
   */
  getCustomers() {
    return this.call('/Customers/', 'GET');
  }

  // /Customers
  /**
   * Create a new customer
   * @param {*} data CustomerDTO
   */
  createCustomer(data) {
    return this.call('/Customers/', 'POST', { data });
  }

  // /Customers/:CustomerId
  /**
   * Retrieve a single customer
   * @param {string} customerId Customer ID
   */
  getCustomer(customerId) {
    return this.call(`/Customers/${customerId}`, 'GET');
  }

  // /Customers/:CustomerId
  /**
   * Replaces a customer's data
   * @param {string} customerId Customer ID
   * @param {*} data CustomerDTO
   */
  putCustomer(customerId, data) {
    return this.call(`/Customers/${customerId}`, 'PUT', { data });
  }

  // /Customers/:CustomerId
  /**
   * Updates parts of a customer
   * @param {string} customerId Customer ID
   * @param {*} data CustomerDTO
   */
  patchCustomer(customerId, data) {
    return this.call(`/Customers/${customerId}`, 'PATCH', { data });
  }

  // /Customers/:CustomerId
  /**
   * Deletes a customer
   * @param {string} customerId Customer ID
   */
  deleteCustomer(customerId) {
    return this.call(`/Customers/${customerId}`, 'DELETE');
  }

  // /Customers/:CustomerId/Contracts
  /**
   * Retrieves a list of all contracts for the given customer id
   * @param {string} customerId Customer ID
   */
  getCustomerContracts(customerId) {
    return this.call(`/Customers/${customerId}/Contracts`, 'GET');
  }

  // /Contracts
  /**
   * Retrieve a list of contracts
   */
  getContracts() {
    return this.call('/Contracts', 'GET');
  }

  // /Contracts/:ContractId
  /**
   * Retrieves a single contract by Id
   * @param {string} contractId
   */
  getContract(contractId) {
    return this.call(`/Contracts/${contractId}`, 'GET');
  }

  // /Contracts/:ContractId/Usage
  /**
   * Retrieves a contract's associated usage
   * @param {string} contractId
   */
  getContractUsage(contractId) {
    return this.call(`/Contracts/${contractId}/Usage`, 'GET');
  }

  // /Contracts/:ContractId/Usage
  /**
   * Posts new metered usage data
   * @param {string} contractId Contract ID
   * @param {*} data MeteredUsageDTO
   */
  postContractUsage(contractId, data) {
    return this.call(`/Contracts/${contractId}/Usage`, 'POST', { data });
  }

  // /Contracts/:ContractId/Usage/:UsageId
  /**
   * Remove an unbilled metered usage
   * @param {string} contractId Contract ID
   * @param {string} usageId Metered Usage ID
   */
  deleteContractUsage(contractId, usageId) {
    return this.call(`/Contracts/${contractId}/Usage/${usageId}`, 'GET');
  }

  // /Contracts/:ContractId/ComponentSubscriptions/
  /**
   * Retrieves current subscriptions in the selected contract
   * @param {string} contractId Contract ID
   */
  getContractComponentSubscriptions(contractId) {
    return this.call(`/Contracts/${contractId}/ComponentSubscriptions`, 'GET');
  }

  // /Contracts/:ContractId/ComponentSubscriptions/
  /**
   * Create a new component subscription for this contract
   * @param {string} contractId Contract ID
   * @param {*} data ComponentSubscriptionCreateDTO
   */
  createContractComponentSubscription(contractId, data) {
    return this.call(`/Contracts/${contractId}/ComponentSubscriptions`, 'POST', { data });
  }

  // /Contracts/:ContractId/Subscriptions/
  /**
   * Retrieves all currently active subscriptions including plan variant,
   * component subscriptions and discount subscriptions
   * @param {string} contractId Contract ID
   */
  getContractSubscriptions(contractId) {
    return this.call(`/Contracts/${contractId}/Subscriptions`, 'GET');
  }

  // /Contracts/:ContractId/SelfServiceToken/
  /**
   * Retrieve a short-lived selfservice access token
   * @param {string} contractId Contract ID
   */
  getContractSelfServiceToken(contractId) {
    return this.call(`/Contracts/${contractId}/SelfServiceToken`, 'GET');
  }

  // /Contracts/{contractId}/cancellationPreview
  /**
   * Retrieves a cancellation preview for a contract for a regular cancellation,
   * considering contract and notice periods of the booked PlanVariant.
   * @param {string} contractId Contract ID
   */
  getContractCancellationPreview(contractId) {
    return this.call(`/Contracts/${contractId}/cancellationPreview`, 'GET');
  }

  // /Contracts/{contractId}/end
  /**
   * Set an enddate for this contract
   * @param {string} contractId Contract ID
   * @param {*} data ContractEndDTO
   */
  endContract(contractId, data) {
    return this.call(`/Contract/${contractId}/end`, 'POST', { data });
  }

  // /Contracts/{contractId}/ratedItems
  /**
   * Create a Rated Item for this contract
   * @param {string} contractId Contract ID
   * @param {*} data RatedItemCreateDTO
   */
  createContractRatedItem(contractId, data) {
    return this.call(`/Contract/${contractId}/ratedItems`, 'POST', { data });
  }

  // /Subscriptions
  /**
   * Retrieves combined customer and contract data
   */
  getSubscriptions() {
    return this.call('/Subscriptions', 'GET');
  }

  // /Invoices
  /**
   * Retrieves a list of all invoices / credit notes
   */
  getInvoices() {
    return this.call('/Invoices', 'GET');
  }

  // /Invoices
  /**
   * Retrieves an invoice by id
   * @param {string} invoiceId Invoice ID
   */
  getInvoiceById(invoiceId) {
    return this.call(`/Invoices/${invoiceId}`, 'GET');
  }

  // /Invoices/:InvoiceId/downloadLink
  /**
   * Creates a file download token for the given invoice
   * @param {string} invoiceId Invoice ID
   */
  getInvoiceDownloadLink(invoiceId) {
    return this.call(`/Invoices/${invoiceId}/downloadLink`, 'POST');
  }

  // /InvoiceDrafts
  /**
   * Retrieves a list of all invoice drafts
   */
  getInvoiceDrafts() {
    return this.call('/InvoiceDrafts', 'GET');
  }

  // /InvoiceDrafts/:InvoiceDraftId
  /**
   * Retrieves a draft by id
   * @param {string} invoiceDraftId Invoice Draft ID
   */
  getInvoiceDraft(invoiceDraftId) {
    return this.call(`/InvoiceDrafts/${invoiceDraftId}`, 'GET');
  }

  // /InvoiceDrafts/:InvoiceDraftId
  /**
   * Sends the given invoice draft id, thus converting it to an invoice.
   * Returns the newly created invoice
   * @param {string} invoiceDraftId Invoice Draft ID
   */
  sendInvoiceDraft(invoiceDraftId) {
    return this.call(`/InvoiceDrafts/${invoiceDraftId}`, 'POST');
  }

  // /PlanGroups
  getPlanGroups() {
    return this.call('/PlanGroups', 'GET');
  }

  getPlanGroup(planGroupId) {
    return this.call(`/PlanGroups/${planGroupId}`, 'GET');
  }


  // /Plans
  /**
   * Retrieve a list of available plans
   */
  getPlans() {
    return this.call('/Plans', 'GET');
  }

  // /Plans/:PlanId
  /**
   * Retrieves a single plan by ID
   * @param {string} planId Plan ID
   */
  getPlan(planId) {
    return this.call(`/Plans/${planId}`, 'GET');
  }

  // /PlanVariants
  /**
   * Retrieves a list of available Planvariants
   */
  getPlanVariants() {
    return this.call('/PlanVariants', 'GET');
  }

  // /PlanVariants/:PlanVariantId
  /**
   * Retrieves a single Planvariant by ID
   * @param {string} planVariantId PlanVariant ID
   */
  getPlanVariant(planVariantId) {
    return this.call(`/PlanVariants/${planVariantId}`, 'GET');
  }

  // /Webhooks/
  /**
   * Lists all webhooks that you currently have registered
   */
  getWebhooks() {
    return this.call('/webhooks', 'GET');
  }

  // /Webhooks/
  /**
   * Create a new webhook subscription
   * @param {*} data HookDTO
   */
  createWebhook(data) {
    return this.call('/webhooks', 'POST', { data });
  }

  // /Webhooks/:WebhookId
  /**
   * Deletes the webhook from the system
   * @param {string} webhookId Webhook ID
   */
  deleteWebhook(webhookId) {
    return this.call(`/webhooks/${webhookId}`, 'DELETE');
  }
}

exports = BillwerkAPI;
