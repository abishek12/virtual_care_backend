import ServiceModel from "../model/ServiceModel.js";

const listAllServices = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    let { rows: items, count } = await ServiceModel.findAndCountAll({
      where: {},
      limit: limit,
      offset: (page - 1) * limit,
    });

    let pagination = {
      page: Math.ceil(count / limit),
      limit,
      total: count,
    };

    return res.status(200).json({
      success: true,
      items,
      pagination,
      message: "Success",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default listAllServices;
