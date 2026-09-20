import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const { tiktokDl, tiktokv1, tiktokv2, tiktokv3 } = require('./tiktok.cjs')
const { igdl } = require('./instagram.cjs')
const spotifydl = require('./spotify.cjs')
const { threadsdl } = require('./threads.cjs')
const mediafire = require('./mediafire.cjs')
const { pinterest } = require('./pinterest.cjs')
const { wallpaperScraper, deviantartSearch, wallpaperFlareSearch } = require('./wallpaper.cjs')
const { generateIQC } = require('./iqc.cjs')
const RemoveBG = require('./removebg.cjs')
const { imgupscale } = require('./imgupscale.cjs')
const { videoenhancer } = require('./vidupscale.cjs')
const stickerPack = require('./stickerpack.cjs')
const { githubstalkFallback, facebookFallback } = require('./cantarella-fallback.cjs')
const { ffstalk, mlstalk, npmstalk, lyricsSearch, twitterdl, nanoEdit, animeSearch } = require('./cantarella-new.cjs')

export {
  tiktokDl,
  tiktokv1,
  tiktokv2,
  tiktokv3,
  igdl,
  spotifydl,
  threadsdl,
  mediafire,
  pinterest,
  wallpaperScraper,
  deviantartSearch,
  wallpaperFlareSearch,
  generateIQC,
  RemoveBG,
  imgupscale,
  videoenhancer,
  stickerPack,
  githubstalkFallback,
  facebookFallback,
  ffstalk,
  mlstalk,
  npmstalk,
  lyricsSearch,
  twitterdl,
  nanoEdit,
  animeSearch
}
