<template>
  <div id="app">
  <button @click="openModal" class="add-button">Shto Faturë</button>

  <!-- Modal për shtimin e faturës -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <form @submit.prevent="addInvoice" class="invoice-form">
          <h3>Shto nje fature</h3>
          <div class="form-group">
            <label for="invoiceNumber">Nr e faturës:</label>
            <input type="text" id="invoiceNumber" v-model="invoiceNumber" required>
          </div>
          <div class="form-group">
            <label for="invoiceDate">Data e shtimit:</label>
            <input type="date" id="invoiceDate" v-model="invoiceDate" required>
          </div>
          <div class="form-group">
            <label for="totalValue">Vlera totale:</label>
            <input type="number" id="totalValue" v-model="totalValue" required>
          </div>
          <div class="form-group">
            <label for="clientName">Emri i klientit:</label>
            <input type="text" id="clientName" v-model="clientName" required>
          </div>
          <button type="submit" class="submit-button">Shto Faturë</button>
        </form>
      </div>
    </div>

    <!-- Tabela për të shfaqur faturat -->
    <table class="invoice-table">
      <thead>
        <tr>
          <th>Nr Faturës</th>
          <th>Data e Shtimit</th>
          <th>Vlera Totale</th>
          <th>Emri i Klientit</th>
          <th>Veprime</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice._id">
          <td>{{ invoice.invoiceNumber }}</td>
          <td>{{ invoice.invoiceDate }}</td>
          <td>{{ invoice.totalValue }}</td>
          <td>{{ invoice.clientName }}</td>
          <td><button @click="showDeleteConfirmation(invoice._id)" class="delete-button">Fshi</button></td>
        </tr>
      </tbody>
    </table>

     <!-- Modal për konfirmimin e fshirjes së faturës -->
    <div v-if="showConfirmationModal" class="modal">
      <div class="modal-content">
        <h2>Konfirmo Fshirjen</h2>
        <p>Jeni të sigurt që dëshironi të fshini këtë faturë?</p>
        <div class="buttons">
          <button @click="deleteInvoice" class="confirm-button">Po</button>
          <button @click="closeConfirmationModal" class="cancel-button">Jo</button>
        </div>
      </div>
    </div>

    <!-- Shuma totale e faturave -->
    <p class="total-amount">Shuma totale e faturave: {{ totalAmount }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserInvoice',
  data() {
    return {
      showModal: false,
      invoiceNumber: '',
      invoiceDate: '',
      totalValue: '',
      clientName: '',
      invoices: [], // për të ruajtur faturat
      totalAmount: null, // për të ruajtur shumën totale të faturave
      invoiceToDeleteId: null, // ID e invoice qe do te fshihet
      showConfirmationModal: false 
    };
  },
   mounted() {
    this.userId = localStorage.getItem('id');
    
    this.fetchInvoices();
    this.fetchTotalInvoiceAmount()
  },
  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    showDeleteConfirmation(invoiceId) {
      this.invoiceToDeleteId = invoiceId;
      this.showConfirmationModal = true;
    },

    showSuccessToast(message) {
      this.$toast.success(message);
    },
    showErrorToast(message) {
      this.$toast.error(message);
    },

    async addInvoice() {
      try {
        const invoiceData = {invoiceNumber: this.invoiceNumber, invoiceDate: this.invoiceDate, totalValue: this.totalValue, clientName: this.clientName, id: localStorage.getItem("id")}

        const response = await axios.post('http://localhost:3000/', invoiceData);
        this.showSuccessToast(response.data.message); // Output success message from the server

      } catch (error) {
        console.error('Error saving invoice data:', error.response.data.message); // Output error message from the server
        this.showErrorToast(error?.response?.data?.message)
      }

      this.fetchInvoices();
      this.fetchTotalInvoiceAmount();

      this.invoiceNumber = '';
      this.invoiceDate = '';
      this.totalValue = '';
      this.clientName = '';
      this.showModal = false;
    },

    async fetchInvoices() {
      try {

        const response = await axios.get(`http://localhost:3000/?userId=${this.userId}`);

        this.invoices = response.data.invoices;
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    },

    async fetchTotalInvoiceAmount() {
      try {
        const response = await axios.get(`http://localhost:3000/total/?userId=${this.userId}`);
        this.totalAmount = response?.data?.numberOfInvoices;
      } catch (error) {
        console.error('Error fetching total invoices:', error);
      }
    },
    
    async deleteInvoice() {
      try {
        const response = await axios.delete(`http://localhost:3000/invoices/${this.invoiceToDeleteId}`);
        this.showSuccessToast(response.data.message); 
      } catch (error) {
        console.error('Error deleting invoice:', error.response.data.message); // Log error message
        this.showErrorToast(error?.response?.data?.message)
      }
      this.showConfirmationModal = false;
      this.fetchInvoices();
      this.fetchTotalInvoiceAmount()
    },
    closeConfirmationModal() {
      this.invoiceToDeleteId = null;
      this.showConfirmationModal = false;
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.add-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.invoice-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-table th, .invoice-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.invoice-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.submit-button, .confirm-button, .delete-button, .cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
}
.buttons {
  display: flex;
  flex-directions: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.total-amount {
  margin-top: 20px;
}

</style>
