export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize
}: {
  layoutMeasurement: { height: number }
  contentOffset: { y: number }
  contentSize: { height: number }
}) => {
  const paddingToBottom = 20
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
}
