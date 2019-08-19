/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "2d60b379dec007744f7d84f9d23ebc61"
  },
  {
    "url": "assets/css/0.styles.513cdbe1.css",
    "revision": "c932309046de0ca5253c17f4486a0397"
  },
  {
    "url": "assets/generated_output.png",
    "revision": "f3c20eaa6ef4fddae066f67a7d7707e8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.08ce04bd.js",
    "revision": "3abb94c27d1f4c72d6a1f942d73394f7"
  },
  {
    "url": "assets/js/11.23f06983.js",
    "revision": "9e10651d1e3b9f94ab9dbb598616caa8"
  },
  {
    "url": "assets/js/12.a51aef03.js",
    "revision": "eba79de0d7af8e9fc9df24fe33c91bb9"
  },
  {
    "url": "assets/js/13.d2eea937.js",
    "revision": "4eaa9405fb473357f482c95e08618d2b"
  },
  {
    "url": "assets/js/14.6c2da1a2.js",
    "revision": "d1a83c7233bfd7c5c6054c7e7a1fcc6a"
  },
  {
    "url": "assets/js/15.78fa13ee.js",
    "revision": "82df6d9ccdab2f019b8c8db1d3329ddb"
  },
  {
    "url": "assets/js/16.d4cd0c96.js",
    "revision": "568b18919a8fda94426d802b71cbd7a8"
  },
  {
    "url": "assets/js/17.154f63fa.js",
    "revision": "e8b2065600ecc5966742e1c67c25d9e1"
  },
  {
    "url": "assets/js/18.a0c1be51.js",
    "revision": "cb20232d31c5774996c0c5b085e4aebe"
  },
  {
    "url": "assets/js/19.eccb6451.js",
    "revision": "8d836237fb10eb1cb2d02dfe05a54198"
  },
  {
    "url": "assets/js/2.58c29b73.js",
    "revision": "8f265611657e1a7af270952db67ef914"
  },
  {
    "url": "assets/js/3.d7a0c7bd.js",
    "revision": "0792df7eed8b8743cce1a017b756d46d"
  },
  {
    "url": "assets/js/4.c420217c.js",
    "revision": "cbf3c7c37f21104bf6a750be92488d66"
  },
  {
    "url": "assets/js/5.a7ff1231.js",
    "revision": "ed7653f9d04f950307c0e35b118e0c6f"
  },
  {
    "url": "assets/js/6.67c05526.js",
    "revision": "57475d59c9146e5293f0f8f2489fb8f9"
  },
  {
    "url": "assets/js/7.4f92abab.js",
    "revision": "698e649c5272ba53a889d51dfe2c7ffc"
  },
  {
    "url": "assets/js/8.9dc90d78.js",
    "revision": "7fd3726598b79942c9e7c8e8e7fa2978"
  },
  {
    "url": "assets/js/9.a670df6b.js",
    "revision": "120abfa01fbec35e877e399acad0167c"
  },
  {
    "url": "assets/js/app.85cada56.js",
    "revision": "900e89730b0fdce3f23683d6fe42ca2a"
  },
  {
    "url": "assets/macaca-architecture-2.0.png",
    "revision": "196aa63a061930c2c838d05cf3f088ec"
  },
  {
    "url": "assets/new_report_layout.png",
    "revision": "6b89e34146bf9b2bb3902528c87e2042"
  },
  {
    "url": "assets/nosmoke-2.0.png",
    "revision": "21d85f66bc9b95fa843e2d828a89b6f5"
  },
  {
    "url": "assets/nosmoke-hook-2.0.png",
    "revision": "85fbe8277bcac3d90500caaf804a7c37"
  },
  {
    "url": "guide/configuration.html",
    "revision": "5d0e31eb30b74cbd6c9df6a412a7c6b3"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "867af793aac0272eff5976be4a6195f5"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "f7240c95c7d8332eecf3b4e479eeeb78"
  },
  {
    "url": "guide/hooks.html",
    "revision": "5b95d5ac02bf8316c5c9586d36f37567"
  },
  {
    "url": "guide/index.html",
    "revision": "066a8564eca23fc64d695dac8cf4df2e"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "a5e18fd71b355dc7a89a9e334182c578"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "5facad8b08a7bd84bd6ddc882092140d"
  },
  {
    "url": "index.html",
    "revision": "f7ff14580acbf934c255d5fc3b8507de"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "c2a46100cf33e180612cb57ed1aedd5d"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "98884cf52d7edde02f755af9a06ff394"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "6f69dfd68571a26acb1293609ff8237d"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "1ab26482975f71535d052bfc1f517b53"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "00c9d0f409d46a85276750d716b8fed9"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "91993519c620f900eafdd8318287e414"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "c59315908dea53eabf1549b7031a05b1"
  },
  {
    "url": "zh/index.html",
    "revision": "7471f52c44b835ff4af7c4a72f360399"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
