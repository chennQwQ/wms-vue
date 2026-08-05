export default {
  panels: [
    {
      index: 0,
      name: '储位条码',
      paperType: '自定义',
      height: 40,
      width: 70,
      paperHeader: 0,
      paperFooter: 170,
      printElements: [
        {
          options: { left: 18, top: 16, height: 10, width: 150, title: '仓库', field: 'warehouseName', fontSize: 8 },
          printElementType: { title: '文本', type: 'text' },
        },
        {
          options: { left: 18, top: 32, height: 10, width: 150, title: '库区', field: 'zoneName', fontSize: 8 },
          printElementType: { title: '文本', type: 'text' },
        },
        {
          options: {
            left: 18,
            top: 50,
            height: 40,
            width: 150,
            textType: 'barcode',
            title: '储位编码',
            field: 'locationCode',
            barcodeMode: 'CODE128B',
            fontSize: 8,
          },
          printElementType: { title: 'barcode', type: 'text' },
        },
      ],
      panelLayoutOptions: { layoutType: 'column', layoutRowGap: 0, layoutColumnGap: 0 },
    },
  ],
};
