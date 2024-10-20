<template>
  <div class="catalog">
    <template v-if="!api.users.loader && !api.users.error">
      <Accordion
          v-for="user in users"
          :key="user.id"
          @openAccordion="onOpenAccordion(user.id, getAlbums, cache.users,
   'userId', albums , 'albums')"
          class="catalog__item catalog-item"
      >
        <template #title>
          <h2 class="catalog-item__title">{{ user.name }}</h2>
        </template>
        <template v-if="!api.albums.loader && !api.albums.error">
          <Accordion
              v-for="album in getCurrentItems(user.id, albums)"
              :key="album.id"
              @openAccordion="onOpenAccordion(album.id, getPhotos,cache.albums,
      'albumId', photos, 'photos')"
              class="catalog-item__content catalog-item-content"
          >
            <template #title>
              <h3 class="catalog-item-content__title">
                {{ album.title }}
              </h3>
            </template>
            <GridPhotos
                v-if="!api.photos.loader && !api.photos.error"
                :photos="getCurrentItems(album.id, photos)"
            />
            <Loader
                class="catalog-item-content__loader"
                v-else-if="api.photos.loader"
            />
            <Error v-else-if="api.photos.error"/>
          </Accordion>
        </template>
        <Loader
            class="catalog-item__loader"
            v-else-if="api.albums.loader"
        />
        <Error v-else-if="api.albums.error"/>
      </Accordion>
    </template>
    <Loader
        v-else-if="api.users.loader"
        class="catalog__loader"
    />
    <Error
        v-else-if="api.users.error"
        column
        class="catalog__error"
    />
  </div>
</template>

<script>
import Accordion from '@/components/Accordion.vue';
import GridPhotos from '@/components/GridPhotos.vue';
import Loader from '@/components/Loader.vue';
import Error from '@/components/Error.vue';
import { getUsers, getAlbums, getPhotos } from '@/api/catalog';

export default {
  name: 'CatalogView',
  components: {
    Accordion,
    GridPhotos,
    Loader,
    Error,
  },
  data() {
    return {
      users: [],
      albums: [],
      photos: [],
      cache: {
        users: [],
        albums: [],
      },
      api: {
        users: {
          loader: true,
          error: false,
        },
        albums: {
          loader: false,
          error: false,
        },
        photos: {
          loader: false,
          error: false,
        },
      },
      getAlbums,
      getPhotos,
    };
  },
  created() {
    getUsers()
      .then((response) => {
        this.users = response.data;
      })
      .catch(() => {
        this.api.users.error = true;
      })
      .finally(() => {
        this.api.users.loader = false;
      });
  },
  methods: {
    onOpenAccordion(id, promiseApi, cacheArray, itemsId, items, itemsName) {
      if (cacheArray.includes(id)) return;
      this.api[itemsName].loader = true;

      promiseApi(id)
        .then((response) => {
          this.pushNewItems(response, itemsId, items, cacheArray);
        })
        .catch(() => {
          this.api[itemsName].error = true;
        })
        .finally(() => {
          this.api[itemsName].loader = false;
        });
    },
    pushNewItems(response, itemsId, items, cacheArray) {
      const { data } = response;
      const id = data[0][itemsId];
      const item = {};
      item[id] = data;

      items.push(item);
      cacheArray.push(id);
    },
    getCurrentItems(id, array) {
      for (let i = 0; i < array.length; i += 1) {
        if (id in array[i]) {
          return array[i][id];
        }
      }
      return [];
    },
  },
};
</script>

<style scoped lang="scss">
.catalog {
  position: relative;
  display: grid;
  grid-row-gap: 4.8rem;
  grid-auto-rows: max-content;
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  flex-grow: 1;

  &__loader,
  &__error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.catalog-item {
  &__title {
    font-size: 2.2rem;
    line-height: 2.9rem;
    font-weight: 500;
  }

  &__content {
    &:not(:last-child) {
      margin-bottom: 4.8rem;
    }
  }
}

.catalog-item-content {
  &__title {
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-weight: 400;
  }
}

.catalog-item,
.catalog-item-content {
  &__loader {
    display: flex;
    justify-content: center;
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
}
</style>
