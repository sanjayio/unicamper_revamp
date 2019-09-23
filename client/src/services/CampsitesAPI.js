import API from '@/services/API';
export default {
  getCampsites() {
    return API().get('campsites');
  }
};
