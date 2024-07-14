export const getRoomid = (userid1: string, userid2: string) => {
  const sortUserIdRoom = [userid1, userid2].sort();
  const roomid = sortUserIdRoom.join("-");
  return roomid;
};
