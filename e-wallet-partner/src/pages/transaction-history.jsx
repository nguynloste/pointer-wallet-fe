import ItemTransaction from '../components/dashboard/item_transaction'
import partnerAPI from '../api/partner.api'
import { useState } from "react"
import ReactPaginate from 'react-paginate';
import SideBar from '../components/dashboard/sidebar';
import { useQuery } from '@tanstack/react-query';
export default function TransactionHistory({ itemsPerPage }) {
    const [page,setPage] = useState(1)
    const {data,isLoading} = useQuery({
        queryFn: async() => {
            const response = await partnerAPI.getTransactions(page, 10)
            return response.data.data
        },
        queryKey:['transaction-history',page]
    })
    const handlePageClick =async (event) => {
        console.log(event.selected+1)
        setPage(event.selected+1)
    };
    return (
        <div className='flex'>
            <SideBar state="Transactions"></SideBar>
            <div className='w-full px-6 space-y-4'>
            <div className='space-y-2'>
                    <h1 className='font-semi-4xl mt-2'>Transaction History</h1>
                    <h1 className='font-medium text-gray-700'>Access & manage your account and transactions efficiently.</h1>
                </div>
            <table className='min-w-full bg-white rounded-lg font-semibold shadow-md overflow-hidden'>
                <thead>
                    <tr className=' text-gray-700  border-b-[1px] bg-gray-50 '>
                        <td className='p-4'>Amount</td>
                        <td className='p-4'>Status</td>
                        <td className='p-4'>Descriptions</td>
                        <td className='p-4'>Order ID</td>
                        <td className='p-4'>Date</td>
                        <td className='p-4'>Type</td>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? '...Loading' : data.transaction.map((item,key)=>(
                        <ItemTransaction item={item} key={key}/>
                    ))}
                    </tbody>
                </table>
            <div className=' w-fit mx-auto'>
            <ReactPaginate
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={data?.page_count}
                previousLabel="previous"
                pageClassName="inline-block mx-1"
                pageLinkClassName="py-2 px-4 border rounded-lg text-blue-600 hover:bg-gray-200"
                previousClassName="inline-block mx-1"
                previousLinkClassName="py-2 px-4 border rounded-lg text-blue-600 hover:bg-gray-200"
                nextClassName="inline-block mx-1"
                nextLinkClassName="py-2 px-4 border rounded-lg text-blue-600 hover:bg-gray-200"
                breakLabel="..."
                breakClassName="inline-block mx-1"
                breakLinkClassName="py-2 px-4 border rounded-lg text-blue-600 hover:bg-gray-200"
                containerClassName="flex justify-center py-4"
                activeClassName="font-bold text-white "
            />
            </div>
            </div>
                    
        </div>
    )
}