import React, { useEffect, useState } from 'react'
import { IComment } from '../typings';

interface CommentProps {
    comment: IComment;
  }

const Comment = ({ comment }:CommentProps) => {
    const [formattedDate, setFormattedDate] = useState('');
  
    useEffect(() => {
      const date = new Date(comment._createdAt);
      setFormattedDate(
        date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    }, [comment._createdAt]);
  
    return (
      <div className="flex pt-10 h-fit">
        <div className="text-center w-1/6">
          <img
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${comment.name}`}
            alt=""
          />
          <p className="text-white font-thin mt-1">{comment.name}</p>
        </div>
        <div className='pl-1'>
          <div className="bg-neutral-900 p-3 rounded-tl-xl rounded-tr-xl rounded-br-xl h-fit w-5/6">
            <p>{comment.comment}</p>
          </div>
          <p className="text-xs text-zinc-400 mt-1 ml-3">{formattedDate}</p>
        </div>
      </div>
    );
  };

export default Comment



