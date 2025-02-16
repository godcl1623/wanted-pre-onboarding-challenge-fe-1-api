import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodoItem } from 'controllers';
import useCheckLogin from 'hooks/useCheckLogin';
import Path from 'routes/Path';

interface DeleteButtonProps {
  id: string;
  title: string;
  additionalStyle: string;
}

function DeleteButton({ id, title, additionalStyle }: DeleteButtonProps) {
  const navigate = useNavigate();
  const { authenticationToken } = useCheckLogin();

  async function handleClick() {
    const deleteResult = await deleteTodoItem(authenticationToken, id);
    if (deleteResult) {
      localStorage.removeItem(title);
      alert('삭제되었습니다.');
      navigate(Path.Items);
    }
  }

  return (
    <button
      type="button"
      className={`button-alert ${additionalStyle}`}
      onClick={handleClick}
    >
      삭제
    </button>
  );
}

export default React.memo(DeleteButton);
