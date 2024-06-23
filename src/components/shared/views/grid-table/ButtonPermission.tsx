import React from 'react';
import { getButtons, hasPermission } from '@/shared/utils/ultils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { Permission } from '@/shared/enumeration/permission';
import { ButtonAlias } from '@/shared/enumeration/button-alias';
import { ButtonPosition } from '@/shared/enumeration/button-position';
import { IActionButton } from '@/shared/utils/interface/interface-common';

interface Props {
  action: IActionButton;
  onClick: () => void;
}

const ButtonPermission = (props: Props) => {
  const buttonClassName: { [key in ButtonAlias]: string } = {
    [ButtonAlias.view]: 'button-outlined',
    [ButtonAlias.add]: '',
    [ButtonAlias.edit]: 'button-outlined',
    [ButtonAlias.delete]: 'button-outlined-delete',
    [ButtonAlias.authorized]: 'button-outlined',
    [ButtonAlias.history]: '',
    [ButtonAlias.resetPassword]: '',
    [ButtonAlias.lock]: 'button-outlined-lock',
    [ButtonAlias.unlock]: 'button-outlined-lock',
    [ButtonAlias.deleteAll]: 'button-outlined-delete',
    [ButtonAlias.reply]: 'button-outlined',
    [ButtonAlias.assignment]: 'button-outlined',
    [ButtonAlias.approval]: 'button-outlined',
    [ButtonAlias.export]: '',
    [ButtonAlias.import]: '',
  };

  const { action, onClick } = props;

  const buttons = getButtons();
  const hasActionPermission = action.permission === Permission.default ? true : hasPermission(action.permission);

  const listButtons = buttons?.flatMap((menu) => menu.buttons) ?? [];
  const data = listButtons.find((button) => button.permission === action.permission);
  const icon = action.icon ?? data?.meta?.icon;

  const onButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onClick();
  };

  if (!hasActionPermission || !data || (data && data?.menuType === 0)) return <></>;

  if (action.position === ButtonPosition.header) {
    return (
      <Button className="button-primary w-fit text-medium-sm text-white" onClick={onButtonClicked}>
        {action.title}
      </Button>
    );
  }

  if (action.position === ButtonPosition.footer) {
    return (
      <Button className={`${buttonClassName[action.alias]} w-fit text-medium-sm px-5`} onClick={onButtonClicked}>
        {action.title}
      </Button>
    );
  }

  return (
    <Button
      className={`${buttonClassName[action.alias]} button-outlined w-fit text-medium-sm !p-2`}
      onClick={onButtonClicked}
      tooltip={data?.meta?.icon ? action.title : undefined}
      tooltipOptions={{ position: 'bottom' }}
    >
      {icon ? (
        <FontAwesomeIcon icon={icon} className="nav-icon" style={{ height: '16px', width: '16px' }} />
      ) : (
        action.title
      )}
      {/* {action.title} */}
    </Button>
  );
};

export default ButtonPermission;
