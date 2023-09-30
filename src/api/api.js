
export async function getSummary(year) {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/summary?year=${year}`, {
    method: "GET",
  })
  const result = await response.json()
  return result;
}
