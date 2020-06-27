<template>
  <Layout>
    <h1>Family Photos</h1>

    <b-container fluid>
      <b-row>
        <b-col class="img-gallery" v-for="image in $page.photos.edges" :key="image.node.id">
          <g-image
                  @click="setSelectedphoto(image.node.id)"
                  class="img-thumbnail"
                  :src="image.node.thumbnail"
                  :height="image.node.thumbnail.size.height"
                  :title="image.node.title"
                  v-b-modal:image-modal />
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="image-modal" :title="selectedPhoto.title" hide-footer>
      <figure class="figure">
        <g-image class="figure-img img-fluid rounded"
                 :src="selectedPhoto.largeImage"
                 :alt="selectedPhoto.title"
                 :title="selectedPhoto.notes" />
        <figcaption class="figure-caption">
          {{ selectedPhoto.notes }}
          <div v-if="selectedPhoto.peoplePictured.length > 0">
            People pictured:
            <ul class="list-inline">
              <li class="list-inline-item" v-for="participant in selectedPhoto.peoplePictured">
                {{ participant }}
              </li>
            </ul>
          </div>
        </figcaption>
      </figure>
      <b-button :href="selectedPhoto.externalUrl">
        Download Fullsize Image
      </b-button>
    </b-modal>

  </Layout>
</template>

<page-query>
query {
  photos: allKampePhotos {
    edges {
      node {
        id,
        title,
        notes,
        peoplePictured,
        externalUrl,
        thumbnail: image(width:175, quality: 60),
        largeImage: image(width: 500)
      }
    }
  }
}
</page-query>

<script>
export default {
  name: "KampeFamilyPhotos",
  data () {
    return {
      selectedPhotoId: ''
    }
  },
  methods: {
    setSelectedphoto: function (photoId) {
      this.selectedPhotoId = photoId
    }
  },
  computed: {
    selectedPhoto: function () {
      return (this.$page.photos.edges.find(photo => photo.node.id === this.selectedPhotoId) || this.$page.photos.edges[0]).node
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/bootstrap";
  .img-gallery {
    @extend .col;
    @extend .p-2;
    min-width: 175px;

    img {
      transition: transform .2s, filter .5s ease;
      filter: brightness(90%) grayscale(20%);
    }

    img:hover {
      transform: scale(1.2);
      filter: brightness(100%);
      z-index: 1000;
    }
  }
</style>
