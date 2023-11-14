'use client';

import { truncateStr } from '@/lib/utils';
import { useState } from 'react';

export default function NovelDesc({ html }: { html: string }) {
  const [moreDesc, setMoreDesc] = useState<boolean>(false);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: truncateStr(html, 365, moreDesc) }} />
      <span className="cursor-pointer text-teal-700" onClick={() => setMoreDesc(!moreDesc)}>
        {' '}
        {moreDesc ? 'thu gọn' : 'xem thêm'}
      </span>
    </div>
  );
}
