import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, IconButton } from "@chakra-ui/react";
import { ReactComponent as NotificationIcon } from "assets/svg/notification.svg";
import { ReactComponent as NotificationLoadingIcon } from "assets/svg/notification-loading.svg";
import React, { useState } from "react";
import { useWindowWidth } from "utilities/windowWidth";
import moment from "moment";
import { getTimeDifference } from "utilities/general";
import { useUpdateActivityMutation } from "store/activityLogs";
import { usePageNotificationProvider } from "providers/pageNotificationProvider";
import { resolveApiError } from "utilities/errorHandling";

interface NotificationComponentProps {
  notifications?: any[];
  refetch?: any;
}

export const NotificationComponent: React.FC<NotificationComponentProps> = ({ notifications, refetch }) => {
  console.log("NOTIFICATIONS: ", notifications);
  const windowWidth = useWindowWidth();
  const [isActive, setIsActive] = useState<boolean | number>(-1);
  const [updateActivity] = useUpdateActivityMutation();
  const { initNotification } = usePageNotificationProvider();

  const handleMarkUnread = async (id: string) => {
    const payload = {
      activityId: id,
    };
    console.log(payload);
    updateActivity(payload)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        if (res.error) {
          initNotification({
            message: res.message,
            scheme: "error",
          });
          return;
        }
        refetch();
      })
      .catch((error: any) => {
        console.log(error);
        initNotification({
          message: resolveApiError(error),
          scheme: "error",
        });
      });
  };

  const handleMarkAllUnread = async () => {
    notifications?.forEach((item) => {
      handleMarkUnread(item._id);
    });
  };

  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label='Notifications'
        border={0}
        icon={<NotificationIcon />}
        variant='outline'
      />
      <MenuList
        className='overflow-auto'
        width={windowWidth >= 768 ? 350 : windowWidth}
        height={windowWidth >= 768 ? 550 : window.innerHeight}
      >
        <MenuGroup>
          {/* Cube component should be here */}
          {/* <div className="cube"></div> */}
          <div
            className={`d-flex flex-row justify-content-between align-items-center px-4 pt-3 pb-1 ${
              windowWidth <= 768 && "mt-3 mb-4"
            }`}
          >
            <div className='d-flex flex-row align-items-center gap-3'>
              <h6 className={windowWidth >= 768 ? "" : "fs-20 mb-0 fw-600"}>Notifications</h6>
            </div>
            {notifications && notifications.filter((item: any) => item.read === false).length > 0 && (
              <p
                className={`fs-12 text-primary-600 cursor-pointer mb-0 ${
                  windowWidth >= 768 ? "fs-12" : "fs-16 fw-400"
                } `}
                onClick={(e: React.SyntheticEvent) => {
                  e.stopPropagation();
                  handleMarkAllUnread();
                }}
              >
                Mark all as read
              </p>
            )}
          </div>
          {!notifications ||
            (notifications?.length == 0 && (
              <p className='text-grey-300 text-center fw-400 fs-14 my-4'>No new notifications!</p>
            ))}
          {notifications && notifications.length > 0 ? (
            notifications.map((item, index) => {
              return (
                <div
                  key={index}
                  onMouseEnter={() => {
                    setIsActive(index);
                  }}
                  onMouseLeave={() => {
                    setIsActive(-1);
                  }}
                  className={item.read === false ? "bg-primary-25" : ""}
                >
                  <MenuItem
                    margin={0}
                    border={"none"}
                    paddingInline={"5"}
                    className={isActive === index || item.read === false ? "bg-primary-25" : ""}
                  >
                    <div className='d-flex flex-column gap-2 w-95'>
                      <div className='d-flex flex-row align-items-center gap-1 mt-3'>
                        <h6 className={`fw-600 m-0 ${windowWidth <= 768 && "fs-16"}`}>
                          {item.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : "No Title"}
                        </h6>
                        {windowWidth >= 768 && item.read === false && (
                          <span
                            className='fs-12 bg-error-50 text-error-700 fw-500 rounded-pill'
                            style={{ paddingBlock: "2px", paddingInline: "8px" }}
                          >
                            New
                          </span>
                        )}
                        {windowWidth <= 768 && (
                          <p className='text-grey-300 fw-400 fs-12 mb-0 ms-4'>
                            {moment(item.createdAt).fromNow()}
                          </p>
                        )}
                      </div>
                      <p
                        className={`text-grey-600 fw-400 ${windowWidth <= 768 ? "fs-14" : "fs-12"} text-wrap`}
                      >
                        {item.message}
                      </p>
                      {/* {isActive === index && (
                        <span className='d-flex flex-row gap-1 align-items-center mb-2'>
                          <span className='fs-12 text-primary-600 cursor-pointer fw-400'>View Campaign</span>
                          <LinkIcon />
                        </span>
                      )} */}
                      {windowWidth >= 768 && (
                        <div className='position-relative bottom-0 d-flex flex-row-reverse justify-content-between'>
                          <p className='text-grey-600 fw-400 fs-12'>
                            {moment(item.createdAt).fromNow().charAt(0).toUpperCase() +
                              moment(item.createdAt).fromNow().slice(1)}
                          </p>
                          {item.read === false && (
                            <p
                              className='fw-400 fs-12 text-primary-600'
                              onClick={(e: React.SyntheticEvent) => {
                                e.stopPropagation();
                                handleMarkUnread(item._id);
                              }}
                            >
                              Mark as read
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </MenuItem>
                  {index !== notifications.length - 1 && <MenuDivider margin={0} />}
                </div>
              );
            })
          ) : (
            <div className='d-flex justify-content-center align-items-center my-3'>
              <span className='spinner'>
                <NotificationLoadingIcon />
              </span>
            </div>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
