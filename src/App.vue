<template>
    <div id="app">
        <div class="container">
            <div class="jumbotron">
                <h2>Cory Martin's Emma Frontend Project</h2>
            </div>
            <form @submit.prevent="fetchUrlAndDisplayLinks">
                <div class="row">
                    <label for="url" class="col-xs-12">Enter a url. When you click "Find Links," this page will display all the links on that page... beautifully.</label>
                </div>
                <div class="row">
                    <div class="col-xs-8">
                        <input class="form-control" type="url" name="url" placeholder="http://yahoo.com" v-model="url" required />
                    </div>
                    <input class="btn btn-primary col-xs-3 col-xs-offset-1" type="submit" value="Find Links" :disabled="processing" />
                </div>
            </form>
            <div v-if="apiError">
                <h3>There was a problem with the API.</h3>
            </div>
            <div v-if="urlError">
                <h3>There was a problem with that URL. Maybe try a different one?</h3>
            </div>
            <div v-if="!apiError && !urlError && links && links.length > 0 && processed">
                <h3>Here are the {{links.length}} links for {{url}}</h3>
                <div v-for="link in links">
                    <div class="col-xs-3 link-container"><a class="btn btn-primary" :href="link.href" target="_new">{{link.text.trim() == '' ? link.href : link.text}}</a></div>
                </div>
            </div>
            <div v-if="!apiError && !urlError && links && links.length == 0 && processed" class="jumbotron">
                <h3>There are no links for {{url}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'app',
    data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          url: '',
          html: '',
          processing: false,
          processed: false,
          links: [],
          urlError: false,
          apiError: false
        }
    },
    created () {
        console.log('created', this);
    },
    watch: {
        url() {
            this.processed = false;
            this.urlError = false;
            this.apiError = false;
        }
    },
    methods: {
        fetchUrlAndDisplayLinks () {
            var self = this;
            var sent = {
                url: this.url
            }
            self.processing = true;
            axios.post('/getlinks', sent).then(response => {
                self.processing = false;
                self.processed = true;
                if (response.data.error){
                    self.urlError = true;
                }else{
                    self.links = response.data.links;
                }
            }, response => {
                self.processing = false;
                self.processed = true;
                self.apiError = true;
            })
        }
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 30px;
}
h1, h2 {
  font-weight: normal;
}
a {
  width:100%;
}
.link-container{
    margin-top: 15px;
}
</style>