import { request } from './';

export default class BillwerkAPI {
  getApiUrl(short = false) {
    return `https://${this.billwerkHost}${!short ? this.apiPath : ''}`;
  }

  checkAuth(force = false) {
    return new Promise((resolve, reject) => {
      if (this.authToken && !force) {
        resolve(this.authToken);
        return;
      }
      request
        .post(`${this.getApiUrl(true)}/oauth/token`)
        .type('application/x-www-form-urlencoded')
        .auth(this.clientId, this.clientSecret)
        .send({ grant_type: 'client_credentials' })
        .then((response) => {
          if (response.status !== 200) return reject(response);
          this.authToken = response.body.access_token;
          return resolve(this.authToken);
        });
    });
  }

  call(action, method = 'GET', options = {}, skip, take = 500, oldData = []) {
    return this.checkAuth()
      .then((token) => {
        const headers = Object.assign({}, options.headers, {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        });
        let tmpQuery = options.query ? `${options.query}&` : '?';
        tmpQuery += skip ? `skip=${skip}&take=${take}` : `take=${take}`;
        return request[method.toLowerCase()](this.getApiUrl() + action + tmpQuery)
          .set(headers)
          .send(options.data);
      })
      .then((response) => {
        const data = response.body;
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

  constructor(clientId, clientSecret, billwerkHost = 'sandbox.billwerk.com', apiPath = '/api/v1') {
    this.events = {};
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.billwerkHost = billwerkHost;
    this.apiPath = apiPath;
  }

  // /Orders
  createOrder(data) {
    return this.call('/Orders/', 'POST', { data });
  }
  changeOrder(data) {
    return this.call('/Orders/', 'POST', { data });
  }

  // /Orders/:OrderId/Commit
  commitOrder(orderId) {
    return this.call(`/Orders/${orderId}/commit`, 'POST', { data: {} });
  }

  // /Customers
  getCustomers() {
    return this.call('/Customers/', 'GET');
  }
  createCustomer(data) {
    return this.call('/Customers/', 'POST', { data });
  }

  // /Customers/:CustomerId
  getCustomer(customerId) {
    return this.call(`/Customers/${customerId}`, 'GET');
  }
  updateCustomer(customerId, data) {
    return this.call(`/Customers/${customerId}`, 'PUT', { data });
  }

  deleteCustomer(customerId) {
    return this.call(`/Customers/${customerId}`, 'DELETE');
  }

  // /Customers/:CustomerId/Contracts
  getCustomerContracts(customerId) {
    return this.call(`/Customers/${customerId}/Contracts`, 'GET');
  }

  // /Contracts
  getContracts() {
    return this.call('/Contracts', 'GET');
  }

  // /Contracts/:ContractId
  getContract(contractId) {
    return this.call(`/Contracts/${contractId}`, 'GET');
  }

  deleteContract(contractId) {
    return this.call(`/Contracts/${contractId}`, 'DELETE');
  }

  // /Contracts/:ContractId/Usage
  getContractUsage(contractId) {
    return this.call(`/Contracts/${contractId}/Usage`, 'GET');
  }
  addContractUsage(contractId, data) {
    return this.call(`/Contracts/${contractId}/Usage`, 'POST', { data });
  }

  // /Contracts/:ContractId/Usage
  getContractDiscountSubscriptions(contractId) {
    return this.call(`/Contracts/${contractId}/DiscountSubscriptions`, 'GET');
  }

  // /Contracts/:ContractId/Usage/:UsageId
  deleteContractUsage(contractId, usageId) {
    return this.call(`/Contracts/${contractId}/Usage/${usageId}`, 'GET');
  }

  // /Contracts/:ContractId/ComponentSubscriptions/
  getContractSubscriptions(contractId) {
    return this.call(`/Contracts/${contractId}/ComponentSubscriptions`, 'GET');
  }
  createContractSubscription(contractId, data) {
    return this.call(`/Contracts/${contractId}/ComponentSubscriptions`, 'POST', { data });
  }

  getContractComponent(id) {
    return this.call(`/Components/${id}`, 'GET');
  }

  // /Contracts/:ContractId/SelfServiceToken/
  getContractSelfServiceToken(contractId) {
    return this.call(`/Contracts/${contractId}/SelfServiceToken`, 'GET');
  }

  // /Invoices
  getInvoices(customerId) {
    return this.call('/Invoices', 'GET', customerId ? { data: { customerId } } : {});
  }

  // /Invoices/:InvoiceId
  getInvoice(invoiceId) {
    return this.call(`/Invoices/${invoiceId}`, 'GET');
  }

  // /Invoices/:InvoiceId/downloadLink
  getInvoiceDownloadLink(invoiceId) {
    return this.call(`/Invoices/${invoiceId}/downloadLink`, 'POST');
  }

  // /InvoiceDrafts
  getInvoiceDrafts() {
    return this.call('/InvoiceDrafts', 'GET');
  }

  // /InvoiceDrafts/:InvoiceDraftId
  getInvoiceDraft(invoiceDraftId) {
    return this.call(`/InvoiceDrafts/${invoiceDraftId}`, 'GET');
  }


  // /Files
  getFiles() {
    return this.call('/Files', 'GET');
  }

  // /Files/:FileId
  getFile(fileId) {
    return this.call(`/Files/${fileId}`, 'GET');
  }

  // /PlanGroups
  getPlanGroups() {
    return this.call('/PlanGroups', 'GET');
  }


  // /Plans
  getPlans() {
    return this.call('/Plans', 'GET');
  }

  // /PlanVariants
  getPlanVariants() {
    return this.call('/PlanVariants', 'GET');
  }

  deleteVariant(planVariantId) {
    return this.call(`/planVariants/${planVariantId}`, 'DELETE');
  }

  createPlanVariant(PlanId, data) {
    return this.call(`/plans/${PlanId}/planVariants`, 'POST', {
      data: Object.assign({ PlanId }, data),
    });
  }

  // /webhooks/
  getWebhooks() {
    return this.call('/webhooks', 'GET');
  }

  createWebhook(data) {
    return this.call('/webhooks', 'POST', { data });
  }

  // /Webhooks/:WebhookId
  deleteWebhook(webhookId) {
    return this.call(`/webhooks/${webhookId}`, 'DELETE');
  }

  // /Discounts
  getDiscounts() {
    return this.call('/Discounts', 'GET');
  }

  // /Discounts/
  getDiscountByID(id) {
    return this.call(`/Discounts/${id}`, 'GET');
  }

  // /Discounts
  getPaymentTransactions() {
    return this.call('/PaymentTransactions', 'GET');
  }

  getPaymentTransaction(id) {
    return this.call(`/PaymentTransactions/${id}`, 'GET');
  }
}
