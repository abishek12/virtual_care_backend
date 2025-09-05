import AccessControl from "accesscontrol";

const ac = new AccessControl();

ac.grant("editor")
  .readOwn("profile")
  .createAny("article")
  .readAny("article")
  .updateAny("article")
  .updateAny("booking")
  .deleteAny("booking")
  .deleteAny("article");

ac.grant("administrator")
  .extend("editor")
  .updateAny("profile")
  .deleteAny("article");

ac.grant("subscriber")
  .readAny("article")
  .readOwn("profile");

export default ac;
