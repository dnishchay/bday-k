import type { Fragment } from './types'

// Everything personal to K lives here. Each fragment is one phrase of the
// message, carried by one butterfly — join every fragment's text (in order,
// with single spaces) and you get the message back exactly as written.
export const friendName = 'K'

export const introHeading = `for ${friendName} 🦋`
export const introInstruction = 'tap a butterfly ✨'

export const fragments: Fragment[] = [
  { id: 'f1', paragraph: 0, text: 'Many, Many Happy Birthday' },
  { id: 'f2', paragraph: 0, text: 'to the girl who carries an entire universe of stories' },
  { id: 'f3', paragraph: 0, text: 'in a single glance. ✨' },

  { id: 'f4', paragraph: 1, text: "You cross people's lives like a rare butterfly..." },
  { id: 'f5', paragraph: 1, text: 'bringing a quiet grace, a soft warmth,' },
  { id: 'f6', paragraph: 1, text: "and a gentle comfort that lingers long after you've passed by." },
  { id: 'f7', paragraph: 1, text: 'Knowing you and getting to see the depth of your beautiful soul' },
  { id: 'f8', paragraph: 1, text: 'is a gift in itself.' },

  { id: 'f9', paragraph: 2, text: 'I hope this year wraps you in the same kindness, peace, and warmth' },
  { id: 'f10', paragraph: 2, text: 'that you so effortlessly give to everyone else.' },
  { id: 'f11', paragraph: 2, text: 'Today is all about celebrating the beautiful person you are.' },
  { id: 'f12', paragraph: 2, text: 'Have the most magical day, butterfly. 🌸🤍' },
]

export const finaleHeading = `Happy Birthday, ${friendName}! 🦋`
export const finaleSubtext = 'May this year be as awesome as you are.'
export const replayLabel = 'Set them free again'
