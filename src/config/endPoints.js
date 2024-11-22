export const endPoints = {

  cells: (prefix, page_num)=>`/v1/sa_kpi/cells-list/${prefix}/${page_num}`,

  daily: {

    standardKpi: {
      regions: '/v1/sa_kpi/region/daily/standard',
      cells: '/v1/sa_kpi/cells/daily/standard',
    },

    flexKpi: {
      regions: '/v1/sa_kpi/region/daily/flex',
      cells: '/v1/sa_kpi/cells/daily/flex',
    },

  },
  hourly: {
    standardKpi: {
      regions: '/v1/sa_kpi/region/hourly/standard',
      cells: '/v1/sa_kpi/cells/hourly/standard',

    },

    flexKpi: {
      regions: '/v1/sa_kpi/region/hourly/flex',
      cells: '/v1/sa_kpi/cells/hourly/flex',
    }
  }





}
