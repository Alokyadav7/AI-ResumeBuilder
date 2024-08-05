import { Input } from '@/components/ui/input'
import { useState } from 'react'

const formField = {
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}

const Experience = () => {
    const [experienceList, setExperienceList] = useState([
        formField
    ])

const handleChange = () => (index,event) => {

}

  return (
    <div>
        <div className="p-5 shadow-lg rounded-lg border-t-blue-500 border-t-4 mt-12">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add Your previous Job Experience</p>
      <div>
        {experienceList.map((item,index) => {
            <div>
                <div className='grid grid-cols-2'>
                    <div>
                        <label>Position Title</label>
                        <Input  name="title" onChange={(event) => handleChange(index,event) }/>
                    </div>

                </div>
            </div>
        })}
      </div>
      </div>
      
    </div>
  )
}

export default Experience
