<script>
  // Status options
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'pre_approved', label: 'Pre-Approved', color: 'blue' },
    { value: 'nda_signed', label: 'NDA Signed', color: 'indigo' },
    { value: 'proforma_sent', label: 'Proforma Sent', color: 'purple' },
    { value: 'payment_verified', label: 'Payment Verified', color: 'green' },
    { value: 'active', label: 'Active', color: 'emerald' }
  ];

  // Mock data for partnership applications
  let partners = [
    {
      id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      name: "John Smith",
      email: "john@example.com",
      company: "Smith Retail",
      country: "United States",
      status: "pending",
      created_at: "2023-06-15T10:30:00Z",
      updated_at: "2023-06-15T10:30:00Z"
    },
    {
      id: "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
      name: "Maria Garcia",
      email: "maria@retailcorp.es",
      company: "RetailCorp Spain",
      country: "Spain",
      status: "pre_approved",
      created_at: "2023-06-18T14:45:00Z",
      updated_at: "2023-06-20T09:15:00Z"
    },
    {
      id: "c3d4e5f6-a7b8-9012-3456-7890abcdef12",
      name: "David Chen",
      email: "david@asiadistributors.com",
      company: "Asia Distributors Ltd",
      country: "Singapore",
      status: "nda_signed",
      created_at: "2023-06-10T08:20:00Z",
      updated_at: "2023-06-22T11:30:00Z"
    },
    {
      id: "d4e5f6a7-b8c9-0123-4567-890abcdef123",
      name: "Sarah Johnson",
      email: "sarah@retailgroup.co.uk",
      company: "Retail Group UK",
      country: "United Kingdom",
      status: "proforma_sent",
      created_at: "2023-06-05T16:10:00Z",
      updated_at: "2023-06-25T13:45:00Z"
    },
    {
      id: "e5f6a7b8-c9d0-1234-5678-90abcdef1234",
      name: "Robert Kim",
      email: "robert@kimtrading.kr",
      company: "Kim Trading Co.",
      country: "South Korea",
      status: "payment_verified",
      created_at: "2023-06-01T09:30:00Z",
      updated_at: "2023-06-28T15:20:00Z"
    },
    {
      id: "f6a7b8c9-d0e1-2345-6789-0abcdef12345",
      name: "Emma Wilson",
      email: "emma@australiadirect.com.au",
      company: "Australia Direct",
      country: "Australia",
      status: "active",
      created_at: "2023-05-20T11:45:00Z",
      updated_at: "2023-06-30T10:15:00Z"
    }
  ];

  // Function to update partner status
  async function updatePartnerStatus(id, newStatus) {
    const partner = partners.find(p => p.id === id);
    if (partner) {
      partner.status = newStatus;
      partner.updated_at = new Date().toISOString();
      partners = [...partners]; // Trigger reactivity

      // In a real app, this would call the Netlify function
      // const response = await fetch('/.netlify/functions/send-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     partnerId: id,
      //     status: newStatus,
      //     brand: 'fortress' // or any other brand
      //   }),
      // });

      // const result = await response.json();
      // console.log('Email sent:', result);

      alert(`Partner status updated to ${newStatus} and email notification sent.`);
    }
  }

  // Function to send pre-approval package
  async function sendPreApproval(id) {
    await updatePartnerStatus(id, 'pre_approved');
  }

  // Function to send proforma invoice
  async function sendProforma(id) {
    await updatePartnerStatus(id, 'proforma_sent');
  }

  // Function to verify payment
  async function verifyPayment(id) {
    await updatePartnerStatus(id, 'payment_verified');
  }

  // Function to get status label with color
  function getStatusBadge(status) {
    const statusOption = statusOptions.find(option => option.value === status);
    if (!statusOption) return `<span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">${status}</span>`;

    const colorMap = {
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      purple: 'bg-purple-100 text-purple-800',
      green: 'bg-green-100 text-green-800',
      emerald: 'bg-emerald-100 text-emerald-800'
    };

    return `<span class="px-2 py-1 text-xs rounded-full ${colorMap[statusOption.color]}">${statusOption.label}</span>`;
  }

  // Filter partners by status
  $: pendingPartners = partners.filter(partner => partner.status === 'pending');
  $: preApprovedPartners = partners.filter(partner => partner.status === 'pre_approved');
  $: ndaSignedPartners = partners.filter(partner => partner.status === 'nda_signed');
  $: proformaSentPartners = partners.filter(partner => partner.status === 'proforma_sent');
  $: paymentVerifiedPartners = partners.filter(partner => partner.status === 'payment_verified');
  $: activePartners = partners.filter(partner => partner.status === 'active');
</script>

<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-2xl font-bold mb-6">Partnership Management</h2>

  <!-- Stats Overview -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
    {#each statusOptions as status}
      <div class="bg-{status.color}-50 p-4 rounded-lg border border-{status.color}-200">
        <h3 class="text-sm font-semibold text-{status.color}-800">{status.label}</h3>
        <p class="text-2xl font-bold text-{status.color}-600">
          {partners.filter(p => p.status === status.value).length}
        </p>
      </div>
    {/each}
  </div>

  <!-- Pending Partners -->
  {#if pendingPartners.length > 0}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Pending Applications</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each pendingPartners as partner}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{partner.name}</div>
                  <div class="text-sm text-gray-500">{partner.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{partner.company}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner.country}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {@html getStatusBadge(partner.status)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    on:click={() => sendPreApproval(partner.id)}
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Send Pre-Approval
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Pending Applications</h3>
      <p class="text-gray-500 italic">No pending applications at this time.</p>
    </div>
  {/if}

  <!-- Pre-Approved Partners -->
  {#if preApprovedPartners.length > 0}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Pre-Approved Partners</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each preApprovedPartners as partner}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{partner.name}</div>
                  <div class="text-sm text-gray-500">{partner.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{partner.company}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner.country}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {@html getStatusBadge(partner.status)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    on:click={() => updatePartnerStatus(partner.id, 'nda_signed')}
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Mark NDA Signed
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Pre-Approved Partners</h3>
      <p class="text-gray-500 italic">No pre-approved partners at this time.</p>
    </div>
  {/if}

  <!-- NDA Signed Partners -->
  {#if ndaSignedPartners.length > 0}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">NDA Signed Partners</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each ndaSignedPartners as partner}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{partner.name}</div>
                  <div class="text-sm text-gray-500">{partner.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{partner.company}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner.country}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {@html getStatusBadge(partner.status)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    on:click={() => sendProforma(partner.id)}
                    class="text-purple-600 hover:text-purple-900"
                  >
                    Send Proforma Invoice
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">NDA Signed Partners</h3>
      <p class="text-gray-500 italic">No partners with signed NDA at this time.</p>
    </div>
  {/if}

  <!-- Proforma Sent Partners -->
  {#if proformaSentPartners.length > 0}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Proforma Sent Partners</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each proformaSentPartners as partner}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{partner.name}</div>
                  <div class="text-sm text-gray-500">{partner.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{partner.company}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner.country}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {@html getStatusBadge(partner.status)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    on:click={() => verifyPayment(partner.id)}
                    class="text-green-600 hover:text-green-900"
                  >
                    Verify Payment
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Proforma Sent Partners</h3>
      <p class="text-gray-500 italic">No partners with proforma invoice sent at this time.</p>
    </div>
  {/if}

  <!-- Payment Verified Partners -->
  {#if paymentVerifiedPartners.length > 0}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Payment Verified Partners</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each paymentVerifiedPartners as partner}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{partner.name}</div>
                  <div class="text-sm text-gray-500">{partner.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{partner.company}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner.country}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {@html getStatusBadge(partner.status)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    on:click={() => updatePartnerStatus(partner.id, 'active')}
                    class="text-emerald-600 hover:text-emerald-900"
                  >
                    Activate Partner
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Payment Verified Partners</h3>
      <p class="text-gray-500 italic">No partners with verified payment at this time.</p>
    </div>
  {/if}

  <!-- Active Partners -->
  <div>
    <h3 class="text-xl font-semibold mb-4">Active Partners</h3>
    {#if activePartners.length > 0}
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner Since</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each activePartners as partner}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{partner.name}</div>
                  <div class="text-sm text-gray-500">{partner.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{partner.company}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner.country}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {@html getStatusBadge(partner.status)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(partner.updated_at).toLocaleDateString()}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-gray-500 italic">No active partners at this time.</p>
    {/if}
  </div>
</div>