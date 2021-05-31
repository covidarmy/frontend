export const getTotalUsersFromLeads = (leads) => {
  const uniqueUsers = []
  leads.forEach((lead) => {
    if (!uniqueUsers.includes(lead.userId[0])) {
      uniqueUsers.push(lead.userId[0])
    }
  })
  return uniqueUsers.length
}
