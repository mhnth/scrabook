import * as cheerio from 'cheerio';

const crawl = {
  baseUrl: 'https://truyenfull.vn/',

  async _getDoc(path: string) {
    try {
      const res = await fetch(this.baseUrl + path, { mode: 'no-cors' });
      // if (!res.ok) return null;

      const html = await res.text();

      return cheerio.load(html);
    } catch (error) {
      console.log('ERROR _getDoc:', error);
      return null;
    }
  },

  async gen(path: string, page?: string) {
    const pagination = page ? '/trang-' + page + '/' : '';

    const $ = await this._getDoc(path + pagination);

    if ($) {
      const el = $('.list-truyen div[itemscope]');
      const novelList = [];
      const next = $('.pagination li.active + li').text();
      const current = $('.pagination li.active').text().split(' ')[0];

      for (let i = 0; i < el.length; i++) {
        const e = el[i];
        const cover = $(e).find('[data-image]').attr('data-image');
        const link = $(e)
          .find('.truyen-title > a')
          .first()
          .attr('href')
          ?.slice(22); //"https://truyenfull.vn/".length
        novelList.push({
          name: $(e).find('.truyen-title > a').text(),
          link: link,
          author: $(e).find('.author').text(),
          cover: cover?.replace('=w60-h85-c', ''),
          host: 'https://truyenfull.vn',
        });
      }

      return { novelList: novelList, current, next, isNext: !!next };
    }

    return null;
  },

  async search(key: string, page = '1') {
    const $ = await this._getDoc(`tim-kiem/?tukhoa=${key}&page=${page}`);

    if ($) {
      let el = $('.list-truyen div[itemscope]');
      let novelList = [];
      let next = $('.pagination li.active + li').text();
      const current = $('.pagination li.active').text().split(' ')[0];
      for (var i = 0; i < el.length; i++) {
        var e = el.get(i);
        const link = $(e).find('.truyen-title > a').attr('href')?.slice(22); //"https://truyenfull.vn/".length
        novelList.push({
          name: $(e).find('.truyen-title > a').text(),
          link: link,
          description: $(e).find('.author').text(),
          cover: $(e).find('[data-image]').attr('data-image'),
          author: $(e).find('.author').text(),
          host: 'https://truyenfull.vn',
        });
      }

      return { novelList, current, isNext: !!next };
    }

    return null;
  },

  async getInfo(path: string) {
    const $ = await this._getDoc(path);

    if ($)
      return {
        name: $('h3.title')?.text() || 'name is null',
        cover: $('div.book img')?.attr('src') || 'cover image is null',
        author: $('div.info div a')?.first().text() || 'author is null',
        description: $('div.desc-text')?.html() || 'description is null',
        details:
          $('div.info').html()?.replaceAll('</h3>', ' ') ||
          '[getInfo] details is null',
        ongoing: $('div.info').html()?.indexOf('>Đang ra<')! > 0,
        total_page: $('input#total-page').attr('value'),
        host: 'truyenfull.vn',
      };

    return null;
  },

  async getChapsUrl(path: string, page = '1') {
    const $ = await this._getDoc(
      page === '1' ? `${path}` : `${path}/trang-${page}`,
    );

    if (!$) return null;
    const url = `${path}/trang-${page}`;

    const chapsUrls = [];
    const cl = $('.list-chapter > li');

    for (let i = 0; i < cl.length; i++) {
      const c = cl[i];

      chapsUrls.push({
        name: $(c).find('a').text(),
        input: $(c).find('a').attr('href')?.slice(22),
      });
    }

    return chapsUrls;
  },

  async getChap(url: string) {
    const $ = await this._getDoc(url);

    if ($) {
      const name = $('a.truyen-title').text();
      const chap = $('span[itemprop=name]').last().text();
      const chapterTitle = $('.chapter-title').text();

      $('noscript')?.remove();
      $('script')?.remove();
      $('iframe')?.remove();
      $('div.ads-responsive')?.remove();
      $('[style=font-size.0px;]').remove();
      $('a').remove();
      $('div.chapter-c > br:last-child + p').remove();

      let txt = $('div.chapter-c');
      // txt.find('p').last().remove();
      let text =
        txt
          .html()
          ?.replace('<em>.*?Chương này có nội dung ảnh.*?</em>', '</?em>') ||
        'chap text is null';

      return { text, name, chap, chapterTitle };
    }

    return null;
  },
};

export default crawl;
