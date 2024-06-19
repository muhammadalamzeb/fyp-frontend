import {formateDate} from "../../utils/formateDate"

const Appointments = ({appointments , doc_name , doc_email, doc_number})=>{
    // Sort the appointments in descending order by createdAt (newest first)
    const sortedAppointments = appointments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    var meeting = `https://meet.jit.si/${doc_email}`;
    return(
        <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Gender</th>
                    <th scope="col" className="px-6 py-3">Payment</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Contact</th>
                    <th scope="col" className="px-6 py-3">Meeting</th>
                </tr>
            </thead>
            <tbody>
                {sortedAppointments?.map(item=>
                <tr key={item._id}>
                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                        <img src={item.user.photo} className="w-10 h-10 rounded-full" />
                        <div className="pl-3">
                            <div className="text-base font-semibold">{item.user.name}</div>
                            <div className="text-normal text-gray-500">{item.user.email}</div>
                        </div>
                    </th>
                    <td className="px-6 py-4">{item.user.gender}</td>
                    <td className="px-6 py-4">
                        {item.isPaid && (
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2">
                                Paid
                            </div>
                        </div>
                    )}
                    {!item.isPaid && (
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2">
                                Unpaid
                            </div>
                        </div>
                    )}
                    </td>
                    <td className="px-6 py-4">{item.ticketPrice}</td>
                    <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
                    <td className="px-6 py-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                const email = item.user.email;
                                const subject = `Reminder: Appointment with Dr.${doc_name} - Action Required`;
                                
                                const body = `Dear ${item.user.name},

We hope this message finds you well.

This is a reminder for your upcoming appointment with Dr. ${doc_name} at our clinic. Please make sure to arrive within the next 30 minutes.

If you prefer to join the appointment via an online conference instead of coming to the clinic, please reply to this email or contact us at 0${doc_number}.

To join the online meeting, please use the following link:
${meeting}

Thank you for your cooperation.

Best regards,
${doc_name}`;
                                window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                }}>
                        Send Email
                        </button>
                    </td>

                    <td className="px-6 py-4">
                            <a className="bg-blue-500 text-white px-4 py-2 rounded"
                                href={`https://meet.jit.si/${doc_email}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                // className="text-blue-500 underline"
                            >
                                Join
                            </a>
                        </td>

                </tr>)}
            </tbody>
        </table>
    )
}

export default Appointments