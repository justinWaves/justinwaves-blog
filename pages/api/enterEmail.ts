// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from "@sanity/client"

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function enterEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
const { _id, name, email} = JSON.parse(req.body);

try{
    await client.create({
        _type: 'emails',
        post: {
            
            _ref: _id
           },
    name,
    email,
   
        })
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: `Couldn't submit email`, err})
        }

console.log('email submitted')
  return res.status(200).json({ message: 'email Submitted' })
}