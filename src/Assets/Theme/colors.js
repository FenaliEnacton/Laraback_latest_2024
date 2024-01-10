import ImageColors from 'react-native-image-colors';

export const COLORS = {
  primary: '#1F2732',
  secondary: '#E6936B',
  light_primary: '#E2F7EB',
  white: '#fff',
  black: '#1F2732',
  dark: '#19122e',
  grey: '#929292',
  light_grey: '#a1a1a1',
  grey_underline: '#707070',
  icon_color: '#575352',
  green_approved: '#14A235',
  light_green_approved: '#14A2354D',
  error: '#e63946',
  background: '#F8F8F8',
  pickup_bg: '#F8f8f8',
  blackText: '#303030',
  pending: '#FFDD00',
  light_pending: '#FEF9E7',
  coupon_code_bg_color: '#E6936B4D',
  declined: '#ff3838',
  fav: '#FC4A4A',
  gradient_secondary: '#BE5532',
  border_light: '#DDDDDD',
  cb_rates: '#E6936B40',
  notch_bg: '#00000026',
  home_bg: '#F0F0F0',
  clicked_bg: '#cfe2ff',
  declined_bg: '#e2e3e5',
  confirmed_bg: '#d1e7dd',
  pending_bg: '#fff3cd',
  others_bg: '#cff4fc',
  fav_icon: '#FDA8A8',
  gradient_card_bg: '#c6e6e2',
  brown_text: '#795548',
  coupon_card_bg: '#e6f0ef',
  copy_code_bg: '#f2faff',
  blur_transparent: 'rgba(50, 50, 50, 0.2)',
  grey_shadow: '#75808e',
};

export const get_status_light_color = status => {
  switch (status) {
    case 'confirmed':
    case 'answered':
    case 'completed':
    case 'closed':
      return COLORS.confirmed_bg;
    case 'pending':
    case 'created':
    case 'open':
    case 'hold':
    case 'tracked':
      return COLORS.pending_bg;
    case 'clicked':
      return COLORS.clicked_bg;
    case 'declined':
      return COLORS.declined_bg;
    default:
      return COLORS.others_bg;
  }
};

export const get_status_dark_color = status => {
  switch (status) {
    case 'confirmed':
    case 'answered':
    case 'completed':
    case 'closed':
      return COLORS.green_approved;
    case 'pending':
    case 'created':
    case 'open':
    case 'hold':
    case 'tracked':
    case 'clicked':
      return COLORS.pending;
    case 'declined':
      return COLORS.declined;
    default:
      return COLORS.grey;
  }
};

//improve random color logic
const COLORS_SET = [
  '#E9D783',
  '#4AA4BA80',
  '#F5F6FA',
  '#0000000D',
  '#E6936B40',
  '#CCE6F6',
  '#DDE6E1',
  // '#F2AF5F', // remove this
  '#C0C0C0',
  '#0000001A',
];

const COLORS_SETS = {
  2: [
    '#fbeee6',
    '#e6ecfc',
    '#e0ecde',
    '#F2D0D9',
    '#c2c8c5',
    '#F2CDC4',
    '#F5F6FA',
    '#CCE6F6',
    // '#0000000D',
    // '#E6936B40',
    // '#0000001A',
  ],
  4: [
    '#F2D0D9',
    '#DDE6E1',
    '#e6ecfc',
    '#F2CDC4',
    '#CCE6F6',
    '#fbeee6',
    '#e0ecde',
    '#c2c8c5',
  ],
  8: [
    // '#E9D783',
    // '#4AA4BA80',
    '#DDE6E1',
    // '#F2AF5F', // remove this
    '#C0C0C0',
    '#0000001A',
    '#F5F6FA',
    '#0000000D',
    '#E6936B40',
    '#CCE6F6',
  ],
};
export const GRADIENT_COLOR_SET = {
  1: ['#279ec5', '#ffa8b7', '#BDADF1', '#ffba8a', '#B4B87B', '#B68776'],
  2: ['#C5E1EA', '#fedce2', '#E1DCF3', '#FDE6D5', '#E4E5CE', '#E5CAC0'],
  3: ['#107496', '#fa6d86', '#8665EC', '#FF842E', '#6D721F', '#795548'],
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const get_bg_color = (index = Math.random(), split_index) => {
  let new_colors = COLORS_SETS[split_index];
  let colors = [...new Set(new_colors)];
  // console.log(colors);
  let indexArr = index.toString().split('');
  return colors[indexArr[indexArr.length - 1]];
};
export const bg_color = (index, split_number) => {
  return COLORS_SETS[split_number][index % COLORS_SETS[split_number].length];
};
export const bg_gradient_color = (index, split_number) => {
  return GRADIENT_COLOR_SET[split_number][
    index % GRADIENT_COLOR_SET[split_number].length
  ];
};

export const fetchColors = uri => {
  return new Promise((resolve, reject) => {
    ImageColors.getColors(uri, {
      fallback: '#000000',
      quality: 'low',
      pixelSpacing: 5,
      cache: true,
      headers: {
        authorization: 'Basic 123',
      },
    }).then(result => {
      var colorSet;
      switch (result.platform) {
        case 'android':
          colorSet = {
            background: result.lightVibrant,
            detail: result.dominant,
            primary: result.vibrant,
            secondary: result.darkVibrant,
            rawResult: JSON.stringify(result),
          };
          resolve(colorSet);
          break;
        case 'ios':
          colorSet = {
            background: result.background,
            detail: result.detail,
            primary: result.primary,
            secondary: result.secondary,
            rawResult: JSON.stringify(result),
          };
          resolve(colorSet);
          break;
        default:
          throw new Error('Unexpected platform');
      }
    });
  });
};
export const getLighterColor = (p, c0, c1, l) => {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    i = parseInt,
    m = Math.round,
    a = typeof c1 == 'string';
  if (
    typeof p != 'number' ||
    p < -1 ||
    p > 1 ||
    typeof c0 != 'string' ||
    (c0[0] != 'r' && c0[0] != '#') ||
    (c1 && !a)
  )
    return null;
  if (!this.pSBCr)
    this.pSBCr = d => {
      let n = d.length,
        x = {};
      if (n > 9) {
        ([r, g, b, a] = d = d.split(',')), (n = d.length);
        if (n < 3 || n > 4) return null;
        (x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))),
          (x.g = i(g)),
          (x.b = i(b)),
          (x.a = a ? parseFloat(a) : -1);
      } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6)
          d =
            '#' +
            d[1] +
            d[1] +
            d[2] +
            d[2] +
            d[3] +
            d[3] +
            (n > 4 ? d[4] + d[4] : '');
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5)
          (x.r = (d >> 24) & 255),
            (x.g = (d >> 16) & 255),
            (x.b = (d >> 8) & 255),
            (x.a = m((d & 255) / 0.255) / 1000);
        else
          (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
      }
      return x;
    };
  (h = c0.length > 9),
    (h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
    (f = this.pSBCr(c0)),
    (P = p < 0),
    (t =
      c1 && c1 != 'c'
        ? this.pSBCr(c1)
        : P
        ? {r: 0, g: 0, b: 0, a: -1}
        : {r: 255, g: 255, b: 255, a: -1}),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) return null;
  if (l)
    (r = m(P * f.r + p * t.r)),
      (g = m(P * f.g + p * t.g)),
      (b = m(P * f.b + p * t.b));
  else
    (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
  (a = f.a),
    (t = t.a),
    (f = a >= 0 || t >= 0),
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h)
    return (
      'rgb' +
      (f ? 'a(' : '(') +
      r +
      ',' +
      g +
      ',' +
      b +
      (f ? ',' + m(a * 1000) / 1000 : '') +
      ')'
    );
  else
    return (
      '#' +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};
export const hexToRgbA = hex => {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return {
      r: +(c >> 16) & 255,
      g: (c >> 8) & 255,
      b: c & 255,
      a: 1,
    };
    // 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
  }
  throw new Error('Bad Hex');
};
