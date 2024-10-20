export default {
  state: {
    favorites: [],
  },
  mutations: {
    updateFavorites(state, photo) {
      state.favorites.push(photo);
    },
    updateFromStorage(state, photos) {
      state.favorites.push(...photos);
    },
  },
  actions: {
    updateFavorites({ state, commit }, photo) {
      const indexOfElement = state.favorites.map((element) => element.id).indexOf(photo.id);
      if (indexOfElement !== -1) {
        state.favorites.splice(indexOfElement, 1);
      } else {
        commit('updateFavorites', photo);
      }

      if (state.favorites.length) {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      } else {
        localStorage.removeItem('favorites');
      }
    },
    updateFromStorage({ commit }, photos) {
      commit('updateFromStorage', photos);
    },
  },
};
