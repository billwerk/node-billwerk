## Functions

<dl>
<dt><a href="#createOrder">createOrder(data)</a></dt>
<dd><p>Create a new plan/component subscription or up/downgrade order</p>
</dd>
<dt><a href="#commitOrder">commitOrder(orderId, data)</a></dt>
<dd><p>Process and finalize an order</p>
</dd>
<dt><a href="#approveOrder">approveOrder(orderId)</a></dt>
<dd><p>[FEATURE] Approve an order</p>
</dd>
<dt><a href="#declineOrder">declineOrder(orderId)</a></dt>
<dd><p>[FEATURE] Decline an order</p>
</dd>
<dt><a href="#getCustomers">getCustomers()</a></dt>
<dd><p>Retrieve a list of all customers</p>
</dd>
<dt><a href="#createCustomer">createCustomer(data)</a></dt>
<dd><p>Create a new customer</p>
</dd>
<dt><a href="#getCustomer">getCustomer(customerId)</a></dt>
<dd><p>Retrieve a single customer</p>
</dd>
<dt><a href="#putCustomer">putCustomer(customerId, data)</a></dt>
<dd><p>Replaces a customer&#39;s data</p>
</dd>
<dt><a href="#patchCustomer">patchCustomer(customerId, data)</a></dt>
<dd><p>Updates parts of a customer</p>
</dd>
<dt><a href="#deleteCustomer">deleteCustomer(customerId)</a></dt>
<dd><p>Deletes a customer</p>
</dd>
<dt><a href="#getCustomerContracts">getCustomerContracts(customerId)</a></dt>
<dd><p>Retrieves a list of all contracts for the given customer id</p>
</dd>
<dt><a href="#getContracts">getContracts()</a></dt>
<dd><p>Retrieve a list of contracts</p>
</dd>
<dt><a href="#getContract">getContract(contractId)</a></dt>
<dd><p>Retrieves a single contract by Id</p>
</dd>
<dt><a href="#getContractUsage">getContractUsage(contractId)</a></dt>
<dd><p>Retrieves a contract&#39;s associated usage</p>
</dd>
<dt><a href="#postContractUsage">postContractUsage(contractId, data)</a></dt>
<dd><p>Posts new metered usage data</p>
</dd>
<dt><a href="#deleteContractUsage">deleteContractUsage(contractId, usageId)</a></dt>
<dd><p>Remove an unbilled metered usage</p>
</dd>
<dt><a href="#getContractComponentSubscriptions">getContractComponentSubscriptions(contractId)</a></dt>
<dd><p>Retrieves current subscriptions in the selected contract</p>
</dd>
<dt><a href="#createContractComponentSubscription">createContractComponentSubscription(contractId, data)</a></dt>
<dd><p>Create a new component subscription for this contract</p>
</dd>
<dt><a href="#getContractSubscriptions">getContractSubscriptions(contractId)</a></dt>
<dd><p>Retrieves all currently active subscriptions including plan variant,
component subscriptions and discount subscriptions</p>
</dd>
<dt><a href="#getContractSelfServiceToken">getContractSelfServiceToken(contractId)</a></dt>
<dd><p>Retrieve a short-lived selfservice access token</p>
</dd>
<dt><a href="#getContractCancellationPreview">getContractCancellationPreview(contractId)</a></dt>
<dd><p>Retrieves a cancellation preview for a contract for a regular cancellation, considering contract and notice periods of the booked PlanVariant.</p>
</dd>
<dt><a href="#endContract">endContract(contractId, data)</a></dt>
<dd><p>Set an enddate for this contract</p>
</dd>
<dt><a href="#createContractRatedItem">createContractRatedItem(contractId, data)</a></dt>
<dd><p>Create a Rated Item for this contract</p>
</dd>
<dt><a href="#getSubscriptions">getSubscriptions()</a></dt>
<dd><p>Retrieves combined customer and contract data</p>
</dd>
<dt><a href="#getInvoices">getInvoices()</a></dt>
<dd><p>Retrieves a list of all invoices / credit notes</p>
</dd>
<dt><a href="#getInvoiceById">getInvoiceById(invoiceId)</a></dt>
<dd><p>Retrieves an invoice by id</p>
</dd>
<dt><a href="#getInvoiceDownloadLink">getInvoiceDownloadLink(invoiceId)</a></dt>
<dd><p>Creates a file download token for the given invoice</p>
</dd>
<dt><a href="#getInvoiceDrafts">getInvoiceDrafts()</a></dt>
<dd><p>Retrieves a list of all invoice drafts</p>
</dd>
<dt><a href="#getInvoiceDraft">getInvoiceDraft(invoiceDraftId)</a></dt>
<dd><p>Retrieves a draft by id</p>
</dd>
<dt><a href="#sendInvoiceDraft">sendInvoiceDraft(invoiceDraftId)</a></dt>
<dd><p>Sends the given invoice draft id, thus converting it to an invoice.
Returns the newly created invoice</p>
</dd>
<dt><a href="#getPlans">getPlans()</a></dt>
<dd><p>Retrieve a list of available plans</p>
</dd>
<dt><a href="#getPlan">getPlan(planId)</a></dt>
<dd><p>Retrieves a single plan by ID</p>
</dd>
<dt><a href="#getPlanVariants">getPlanVariants()</a></dt>
<dd><p>Retrieves a list of available Planvariants</p>
</dd>
<dt><a href="#getPlanVariant">getPlanVariant(planVariantId)</a></dt>
<dd><p>Retrieves a single Planvariant by ID</p>
</dd>
<dt><a href="#getWebhooks">getWebhooks()</a></dt>
<dd><p>Lists all webhooks that you currently have registered</p>
</dd>
<dt><a href="#createWebhook">createWebhook(data)</a></dt>
<dd><p>Create a new webhook subscription</p>
</dd>
<dt><a href="#deleteWebhook">deleteWebhook(webhookId)</a></dt>
<dd><p>Deletes the webhook from the system</p>
</dd>
</dl>

<a name="createOrder"></a>

## createOrder(data)
Create a new plan/component subscription or up/downgrade order

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | OrderDTO |

<a name="commitOrder"></a>

## commitOrder(orderId, data)
Process and finalize an order

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| orderId | <code>string</code> | Order ID |
| data | <code>\*</code> | OrderCommitDTO |

<a name="approveOrder"></a>

## approveOrder(orderId)
[FEATURE] Approve an order

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| orderId | <code>string</code> | Order ID |

<a name="declineOrder"></a>

## declineOrder(orderId)
[FEATURE] Decline an order

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| orderId | <code>string</code> | Order ID |

<a name="getCustomers"></a>

## getCustomers()
Retrieve a list of all customers

**Kind**: global function
<a name="createCustomer"></a>

## createCustomer(data)
Create a new customer

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | CustomerDTO |

<a name="getCustomer"></a>

## getCustomer(customerId)
Retrieve a single customer

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| customerId | <code>string</code> | Customer ID |

<a name="putCustomer"></a>

## putCustomer(customerId, data)
Replaces a customer's data

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| customerId | <code>string</code> | Customer ID |
| data | <code>\*</code> | CustomerDTO |

<a name="patchCustomer"></a>

## patchCustomer(customerId, data)
Updates parts of a customer

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| customerId | <code>string</code> | Customer ID |
| data | <code>\*</code> | CustomerDTO |

<a name="deleteCustomer"></a>

## deleteCustomer(customerId)
Deletes a customer

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| customerId | <code>string</code> | Customer ID |

<a name="getCustomerContracts"></a>

## getCustomerContracts(customerId)
Retrieves a list of all contracts for the given customer id

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| customerId | <code>string</code> | Customer ID |

<a name="getContracts"></a>

## getContracts()
Retrieve a list of contracts

**Kind**: global function
<a name="getContract"></a>

## getContract(contractId)
Retrieves a single contract by Id

**Kind**: global function

| Param | Type |
| --- | --- |
| contractId | <code>string</code> |

<a name="getContractUsage"></a>

## getContractUsage(contractId)
Retrieves a contract's associated usage

**Kind**: global function

| Param | Type |
| --- | --- |
| contractId | <code>string</code> |

<a name="postContractUsage"></a>

## postContractUsage(contractId, data)
Posts new metered usage data

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| contractId | <code>string</code> | Contract ID |
| data | <code>\*</code> | MeteredUsageDTO |

<a name="deleteContractUsage"></a>

## deleteContractUsage(contractId, usageId)
Remove an unbilled metered usage

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| contractId | <code>string</code> | Contract ID |
| usageId | <code>string</code> | Metered Usage ID |

<a name="getContractComponentSubscriptions"></a>

## getContractComponentSubscriptions(contractId)
Retrieves current subscriptions in the selected contract

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| contractId | <code>string</code> | Contract ID |

<a name="createContractComponentSubscription"></a>

## createContractComponentSubscription(contractId, data)
Create a new component subscription for this contract

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| contractId | <code>string</code> | Contract ID |
| data | <code>\*</code> | ComponentSubscriptionCreateDTO |

<a name="getContractSubscriptions"></a>

## getContractSubscriptions(contractId)
component subscriptions and discount subscriptionsding plan variant,

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| contractId | <code>string</code> | Contract ID |

<a name="getContractSelfServiceToken"></a>

## getContractSelfServiceToken(contractId)
Retrieve a short-lived selfservice access token

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| contractId | <code>string</code> | Contract ID |

<a name="endContract"></a>

## endContract(contractId, data)
Set an enddate for this contract

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| contractId | <code>string</code> | Contract ID |
| data | <code>\*</code> | ContractEndDTO |

<a name="createContractRatedItem"></a>

## createContractRatedItem(contractId, data)
Create a Rated Item for this contract

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| contractId | <code>string</code> | Contract ID |
| data | <code>\*</code> | RatedItemCreateDTO |

<a name="getSubscriptions"></a>

## getSubscriptions()
Retrieves combined customer and contract data

**Kind**: global function
<a name="getInvoices"></a>

## getInvoices()
Retrieves a list of all invoices / credit notes

**Kind**: global function
<a name="getInvoiceById"></a>

## getInvoiceById(invoiceId)
Retrieves an invoice by id

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| invoiceId | <code>string</code> | Invoice ID |

<a name="getInvoiceDownloadLink"></a>

## getInvoiceDownloadLink(invoiceId)
Creates a file download token for the given invoice

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| invoiceId | <code>string</code> | Invoice ID |

<a name="getInvoiceDrafts"></a>

## getInvoiceDrafts()
Retrieves a list of all invoice drafts

**Kind**: global function
<a name="getInvoiceDraft"></a>

## getInvoiceDraft(invoiceDraftId)
Retrieves a draft by id

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| invoiceDraftId | <code>string</code> | Invoice Draft ID |

<a name="sendInvoiceDraft"></a>

## sendInvoiceDraft(invoiceDraftId)
Returns the newly created invoice thus converting it to an invoice.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| invoiceDraftId | <code>string</code> | Invoice Draft ID |

<a name="getPlans"></a>

## getPlans()
Retrieve a list of available plans

**Kind**: global function
<a name="getPlan"></a>

## getPlan(planId)
Retrieves a single plan by ID

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| planId | <code>string</code> | Plan ID |

<a name="getPlanVariants"></a>

## getPlanVariants()
Retrieves a list of available Planvariants

**Kind**: global function
<a name="getPlanVariant"></a>

## getPlanVariant(planVariantId)
Retrieves a single Planvariant by ID

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| planVariantId | <code>string</code> | PlanVariant ID |

<a name="getWebhooks"></a>

## getWebhooks()
Lists all webhooks that you currently have registered

**Kind**: global function
<a name="createWebhook"></a>

## createWebhook(data)
Create a new webhook subscription

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | HookDTO |

<a name="deleteWebhook"></a>

## deleteWebhook(webhookId)
Deletes the webhook from the system

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| webhookId | <code>string</code> | Webhook ID |