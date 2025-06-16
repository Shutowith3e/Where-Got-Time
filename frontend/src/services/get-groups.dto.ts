/**
 * Group data from BE
 */
export type GroupData = {
  gid: string;
  group_name: string;
  group_description: string;
};

/**
 * Get groups response body
 */
export type GetGroupsDto = {
  data: {
    /**
     * Groups where user is admin in
     */
    admin_arr: GroupData[];
    /**
     * Groups where user is member in
     */
    member_arr: GroupData[];
  };
};
