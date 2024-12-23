import React from 'react'
type StudnetsProps = {
  title: string;
}
const StudentListing: React.FC<StudnetsProps> = ({ title }) => {
  return (
    <div>{title}</div>
  )
}

export default StudentListing