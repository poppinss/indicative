module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Theme
  |--------------------------------------------------------------------------
  |
  | The theme to be used for pulling document partials and a small
  | stylesheet.
  |
  | The themes are not published on npm, so that you can edit them as part
  | of your source code and neither they have any build process of them.
  |
  | chul theme:list
  | chul theme:add <name>
  | chul theme:remove <name>
  |
  */
  theme: 'slate',

  directories: {
    /*
    |--------------------------------------------------------------------------
    | Content directory
    |--------------------------------------------------------------------------
    |
    | The content directory for storing the asciidoc files. The path should
    | be relative from the root dir.
    |
    */
    content: 'content',

    /*
    |--------------------------------------------------------------------------
    | Pages directory
    |--------------------------------------------------------------------------
    |
    | The directory to be used for storing templates. Ideally you will need one
    | template file that is used for building docs.
    |
    | You can have more template files too, like one for the home page and so on.
    |
    */
    pages: 'pages',

    /*
    |--------------------------------------------------------------------------
    | Build directory
    |--------------------------------------------------------------------------
    |
    | The place where to drop the output of chul. You deploy this directory
    | on your server.
    |
    */
    build: '_site'
  },

  edge: {
    /*
    |--------------------------------------------------------------------------
    | Content view
    |--------------------------------------------------------------------------
    |
    | The view/template file to be used for generating documentation HTML output.
    | The path is relative to the `pages` directory.
    |
    */
    contentView: 'docs.edge',

    /*
    |--------------------------------------------------------------------------
    | Globals
    |--------------------------------------------------------------------------
    |
    | These globals will be added to Edge and you can use them inside your
    | views.
    |
    */
    globals: {
      getMenuFor (category) {
        const topLevelCategories = {
          guides: ['getting-started', 'custom-messages', 'validations', 'sanitizations'],
          api: ['api']
        }

        const cat = topLevelCategories.guides.indexOf(category) > -1 ? 'guides' : 'api'

        return topLevelCategories[cat].map((name) => {
          const forCategory = this.resolve('menu').filter((item) => item.category === name)
          return { category: name, items: forCategory }
        })
      },

      title (categorySlug) {
        return categorySlug.replace(/-(\w)|^(\w)/g, (selection, group, first) => {
          return group ? ` ${group.toUpperCase()}` : `${first.toUpperCase()}`
        })
      },

      groupDocs (menu) {
        return ['getting-started', 'custom-messages', 'validations', 'sanitizations'].map((name) => {
          const forCategory = menu.filter((item) => item.category === name)
          return { category: name, items: forCategory }
        })
      }
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Extensions
  |--------------------------------------------------------------------------
  |
  | Extensions to be used for considering the content file as asciidoctor
  | file.
  |
  */
  contentExtensions: ['adoc', 'asciidoc'],

  /*
  |--------------------------------------------------------------------------
  | Menu file
  |--------------------------------------------------------------------------
  |
  | If you have planning to have some dynamic logic on your server, before you
  | server the docs HTML files, you can instruct `chul` to create a menu JSON
  | file, which maybe used for deriving the logic.
  |
  */
  menuFile: null,

  /*
  |--------------------------------------------------------------------------
  | Asciidoctor settings
  |--------------------------------------------------------------------------
  |
  | These settings are passed directly to
  | https://github.com/asciidoctor/asciidoctor.js
  |
  */
  asciidoctor: {
    doctype: 'article',
    attributes: [
      'icons=font',
      'skip-front-matter=true',
      'sectlinks',
      'sectanchors',
      'linkattrs',
      'toc=macro',
      'toclevels=2',
      'experimental=true'
    ]
  }
}
