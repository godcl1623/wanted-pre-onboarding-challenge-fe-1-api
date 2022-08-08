import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getTodoLists } from 'controllers';
import { TodoItemType } from 'types';
import ModifyButton from 'components/ModifyButton';

export default function TodoDetail() {
  const [itemInfo, setItemInfo] = React.useState<TodoItemType | any>({
    title: '',
    content: '',
    createdAt: '1900-01-01',
    updatedAt: '1900-01-01',
  });
  const param = useParams();
  const authenticationToken = localStorage.getItem('auth');
  const formatter = (dateString: string) => {
    return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
  };
  const shortenedTitle =
    itemInfo.title.length <= 5
      ? itemInfo.title
      : itemInfo.title.slice(0, 4).concat('...');
  React.useEffect(() => {
    getTodoLists(authenticationToken, param.id).then((result) => {
      setItemInfo((previousInfo: TodoItemType) => ({
        ...previousInfo,
        id: result.id,
        title: result.title,
        content: result.content,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      }));
    });
  }, [param]);
  const contents = itemInfo.content
    .split('\n')
    .map((content: string, index: number) => {
      return (
        <p key={`${content[0]}_${index}`} className="flex items-center mb-3">
          {content}
        </p>
      );
    });

  return (
    <article id="details" className="basis-1/2 ml-[0.5%] shadow-lg p-10">
      <h1 className="h-[10%] px-5 text-6xl">{shortenedTitle}</h1>
      <hr className="my-[3%] border border-solid" />
      <section className="h-[74%] px-5 py-3">
        <h1 className="mb-5 font-bold text-3xl">{shortenedTitle}</h1>
        {contents}
      </section>
      <p className="my-1 text-end text-zinc-400">
        작성일: {formatter(itemInfo.createdAt)}
      </p>
      {formatter(itemInfo.createdAt) !== formatter(itemInfo.updatedAt) && (
        <p>수정일: {formatter(itemInfo.updatedAt)}</p>
      )}
      <section className="flex justify-end h-[5%] mt-3">
        <ModifyButton
          id={itemInfo.id}
          title={itemInfo.title}
          content={itemInfo.content}
          createdAt={itemInfo.createdAt}
          updatedAt={itemInfo.updatedAt}
        />
        <button type="button" className="button-alert w-[70px] ml-5">
          삭제
        </button>
      </section>
    </article>
  );
}
