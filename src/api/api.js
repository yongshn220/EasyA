
export async function getSummary(year) {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/summary?year=${year}`, {
    method: "GET",
  })
  return await response.json();
}

export async function getMajorList() {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/majorlist?`, {
    method: "GET",
  })
  return await response.json();
}

