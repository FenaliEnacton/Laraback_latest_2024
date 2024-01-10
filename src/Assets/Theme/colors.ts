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
// const COLORS_SET = [
//   '#E9D783',
//   '#4AA4BA80',
//   '#F5F6FA',
//   '#0000000D',
//   '#E6936B40',
//   '#CCE6F6',
//   '#DDE6E1',
//   // '#F2AF5F', // remove this
//   '#C0C0C0',
//   '#0000001A',
// ];

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

// function shuffle(array) {
//   var currentIndex = array.length,
//     temporaryValue,
//     randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

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
