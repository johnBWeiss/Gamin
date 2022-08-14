
// the shorten function recives texts and slices them according to dynamic values.

export const shorten = (text, limit) => {
    let slicedText = text?.substring(0, limit) ?? ''
    slicedText = text?.length >= limit ? slicedText + '...' : slicedText
    return slicedText
}