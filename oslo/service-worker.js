/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["assets/images/bg.mp4","9561a1fddd6ba8f15cf8de7a95a95956"],["assets/images/gear.jpg","3a9e0efe338e9990cd456d11b11f236d"],["assets/images/juvarabreralogo.psd","ae13d8ab6572a5e109a7241f3eee703e"],["assets/images/logo.png","87a7ca1fadb4cd866d8f0440ca8be28a"],["assets/images/logo/logo.ai","c5f5e52bde9c13fdc4c89c4542d407a9"],["assets/images/logo/logo.svg","586ae6fad8bf8ec6ec81f4725db9ec47"],["assets/images/logo/logo_blue.png","522cea6123f4047eded027a57ce4fc6a"],["assets/images/logo/logo_blue2.png","f670496aa682d12e276e30dfa00aed55"],["assets/images/logo/logo_white.png","a839dbcaf68d230b4e013c18f4cff22d"],["assets/images/logo/logo_white2.png","5e30b408ff9f04984a21f2908eea9fbe"],["assets/images/logo2.png","f373158459a9ecd57c0d31648573cd40"],["assets/images/me.jpg","678923f05f544022e7c2a4e177887b0f"],["assets/images/photography/ja_0038.jpg","82c0a9df1a6e591b2f845b86e95c3c1d"],["assets/images/photography/ja_0056.jpg","533ea07fc849d0faafede58a6979a653"],["assets/images/photography/ja_0078.jpg","a716c50c89df7919493fecc5d53f34f0"],["assets/images/photography/ja_0094.jpg","f40761a24b384ff9ce5605ad27ef136a"],["assets/images/photography/ja_0136.jpg","04867e874e18458693624ed86e586c85"],["assets/images/photography/ja_0140.jpg","cc369208fe9e5e15b139a1fed1b792f1"],["assets/images/photography/ja_0146.jpg","3cfaf3f7b2f50f0678189f0d6825fada"],["assets/images/photography/ja_0150.jpg","2a4eb8c2daebbc658ce32700f848f4c6"],["assets/images/photography/ja_0151.jpg","381b0efa5ae6a5431277ed3b2a03de88"],["assets/images/photography/ja_0168.jpg","0ae777e01a22fe7f95bf5788ecb049f0"],["assets/images/photography/ja_0170.jpg","a2b6b316110d5357759aa2844003fef3"],["assets/images/slideshow/1.jpg","9b0b49d1f8325a185d5fec3cac716673"],["assets/images/slideshow/2.jpg","e34364992d7aba73ef1f87ca33b55048"],["assets/images/slideshow/3.jpg","a8675f7a9310684699a654c1a776527f"],["assets/images/slideshow/4.jpg","d6c2120603140f6e507d66ea77ad3cda"],["assets/images/slideshow/5.jpg","ed185fbfafc8af310cabf57a1727ff0a"],["assets/images/slideshow/6.jpg","e36907af3cca4427da2021cbdf727289"],["assets/images/speaking.jpg","31b2cd1404165b96a7547bec5461bb40"],["assets/images/speaking/build-actions-42118.jpg","b14bb5b607555a035df4d72a21ad5403"],["assets/images/speaking/devfest-halsema.jpg","9cd2a27ee163f04dfa93172e6d344d11"],["assets/images/speaking/dlsud-it-seminar.jpg","f6a50f31817f5161e5d2f152ac6d8b8d"],["assets/images/speaking/io-bulacan.jpg","c0ba19e007401da3e80027c80c249f65"],["assets/images/speaking/io-cavite.jpg","ca0469775b3836dbae066cb1494ac1ee"],["assets/images/speaking/io-palawan.jpg","066d725e2d047295a0a481c1948b3609"],["assets/images/speaking/io-subic.jpg","d1f47b67c074f641f09d976275ca92ac"],["assets/images/speaking/io17-baguio.jpg","ddfc9f803c562aaa40d606127548047e"],["assets/images/speaking/io17-laguna.jpg","c87a16f2d4ef9151cdcee17593ce4e86"],["assets/images/speaking/io17-manila.jpg","f92538e1321b64e5c36852116cbf36b3"],["assets/images/speaking/io17-naga.jpg","95eb5d97be4313dcff8779c379529bb7"],["assets/images/speaking/io17-palawan.jpg","f19aba8f9c5d19cab34f49885273f3e9"],["assets/images/speaking/io18-albay.jpg","b0b90c92ca983d4509b9b6bdb384c081"],["assets/images/speaking/io18-cavite.jpg","f9c4970001bd4ca20a57e5d263688961"],["assets/images/speaking/io18-manila.jpg","7ae71dd4305d7d8834765b0a86a62e00"],["assets/images/speaking/io18-naga.jpg","4ddb44586d416df9bf8658e3286e54e1"],["assets/images/speaking/io18-palawan.jpg","fff99564cd1d90572fb771e906cdb6b0"],["assets/images/speaking/io18-pampanga.jpg","5ca5d0ae30644762d4cef9efe4878127"],["assets/images/speaking/lpu-seminar.jpg","c30dc9f0254c8ab609cc81ae2de16e58"],["assets/images/speaking/lpu-seminar2.jpg","dedec744efd231b30d3a181e10bcd944"],["assets/images/speaking/neust-campus-roadshow.jpg","d07aaad583aa41d9ff4da077b452f4c5"],["assets/images/speaking/pre-sw-manila.jpg","89aa7aadde89cf8a285cd58b92903fb5"],["assets/images/speaking/ue-campus-roadshow.jpg","ccefa8aeb1f8ccaed00bd2491ef5d76c"],["assets/images/speaking/ue-manila-campus-roadshow.jpg","e05ac06520e04565d7e3d2141a2dd55e"],["assets/images/speaking/uph-it-seminar.jpg","f1a28b479a9f19e347e92905770beb57"],["assets/images/speaking/ust-tech-talks.jpg","17eda67558f4e0af7d4859584bf34b83"],["assets/images/speaking/ust-tech-talks2.jpg","35d98255065878c297d451d8f6b1432c"],["assets/images/webdesign/amiga/logo.jpg","b663375af6906a34813419a77dc5bfcc"],["assets/images/webdesign/astravel/logo.jpg","2587a7655342dfa57a25908bd65050c9"],["assets/images/webdesign/astravel/ss.jpg","fd674bc1d32bb74626f59d8a14bbb747"],["assets/images/webdesign/ccors/logo.jpg","d5a3b1c93d9cf26d28a607eddbbb7a8b"],["assets/images/webdesign/chits/logo.jpg","43c6d4a43d03db79440fd207315e9d0d"],["assets/images/webdesign/clayedph/logo.jpg","09be4eacfd9c7f1ac3e1bd9a46e0dca7"],["assets/images/webdesign/clayedph/ss.jpg","45ca874ff759df30136ab56e7c9074a0"],["assets/images/webdesign/devfest16/logo.jpg","d85cdc13496e4bf81f23980b6245e41f"],["assets/images/webdesign/devfest16/ss.jpg","d67c434b8170effbfcfae032a3515bfa"],["assets/images/webdesign/devfest17/logo.jpg","a3ffc2ff2ca593eb8c84b3d6440ed332"],["assets/images/webdesign/devfest17/ss.jpg","7b8335b6f7d70620770de63aa0da0d99"],["assets/images/webdesign/devfest17/ss2.jpg","7c1321e0ee55c005e68b3d11ab9f4bec"],["assets/images/webdesign/devfest18/logo.jpg","fbfd92b822db2502759f7e055a3f6347"],["assets/images/webdesign/devfest18/ss.jpg","293a6d14b892594f039d60eb70d2fb5c"],["assets/images/webdesign/gdgacademy/logo.jpg","eed618408ea5029b011623737716a557"],["assets/images/webdesign/gdgacademy/ss.jpg","1819f8bf432e627f4ef7937f6369d9e5"],["assets/images/webdesign/gdgph/desc.txt","c0d6eb4c34d7b72000782d6c68a508dd"],["assets/images/webdesign/gdgph/logo.jpg","3003e33d4695bbbde84c7ff050176bdc"],["assets/images/webdesign/gdgph/ss.jpg","ec513a3f739f36e05bfec3f734ebf2a1"],["assets/images/webdesign/gdgph/ss2.jpg","111d9eaf6dc7f53e4c86245b3d2ea52a"],["assets/images/webdesign/halalan2016/desc.txt","75249588a304b5faefa8f528ea624ebe"],["assets/images/webdesign/halalan2016/logo.jpg","dc348a28a340d76f90e38f6b246cf8a4"],["assets/images/webdesign/halalan2016/ss.jpg","f45b92327aa66afb3886c702a51b804d"],["assets/images/webdesign/io16/logo.jpg","151da9782e1c215a5efe0089b5db756e"],["assets/images/webdesign/io16/ss.jpg","2f866b7594628eaffc7d1303c56a16a7"],["assets/images/webdesign/io17/logo.jpg","eb3594bb5dbc1bc32c28afd9dea9056e"],["assets/images/webdesign/io17/ss.jpg","7035efe81843ba345ac7090030c5c1a8"],["assets/images/webdesign/meaningfultravels/logo.jpg","56e8b3a3a9ad24e51a3c527470a1cf07"],["assets/images/webdesign/meaningfultravels/ss.jpg","dad1e92dbd2a3e27e0371459910ce759"],["assets/images/webdesign/oes/desc.txt","7e06f497e7f6175c58047cf9f0dbf197"],["assets/images/webdesign/oes/logo.jpg","8ba3b193a336cdc72e4897ebc92046e4"],["assets/images/webdesign/oes/ss.jpg","50878d98eec2f45291cc3c960d06830f"],["assets/images/webdesign/upcmportal/logo.jpg","e5648524b33a255231dd9fcd80f786b0"],["assets/images/webdesign/upmbests/logo.jpg","2c071c25b8186b72f284aab365370209"],["assets/images/webdesign/wice/logo.jpg","dba7a91f6ddff0aed3e722e65bcc5009"],["assets/images/webdesign/wpracss/logo.jpg","477c3e286dd1760dec1f75ba25142b3b"],["assets/images/webdesign/wtm16/logo.jpg","0dd401a085e5ac3bdd40a98c749dd624"],["assets/images/webdesign/wtm16/ss.jpg","0b3d91e2b34228bb7dcc8f50af89516f"],["assets/images/webdesign/wtm16/ss2.jpg","15ce28ae51a4bebe0fd086eb45f186bb"],["assets/images/webdesignlogo.psd","3d9e3defecee10b8f33e91fae492ca25"],["assets/styles/jquery-ui.css","a0629b643dfa8a01ee97b2370d8a6fed"],["assets/styles/material.css","462f4bf1b9e81e61ea905f926c4975c8"],["assets/styles/mdi.css","ee1fe43cddb76243dd248d535d6b9955"],["assets/styles/oslo.css","aa15dbf6b7b1657b46be1446343bbc88"],["assets/styles/variables.css","d41d8cd98f00b204e9800998ecf8427e"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







