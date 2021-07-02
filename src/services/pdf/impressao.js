
export class Impressao {

  constructor(dadosParaImpressao) {
    this.dadosParaImpressao = dadosParaImpressao;
  }
  // Pedidos vencendo no dia
  async relatorioVencimentoDiario() {
    const corpoDocumento = this.CriarRelatorioVencimentoDiario();
    const documento = this.GerarRelatorioVencimentoDiario(corpoDocumento, 'RELATÓRIO DE COBRANÇA DIARIAAA');
    return documento;
  }

  CriarRelatorioVencimentoDiario() {
    const header = [
      { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.name, fontSize: 8 },
        { text: prod.quilo, fontSize: 8 },
        { text: prod.valor, fontSize: 8 },
        { text: prod.desconto, fontSize: 8 },
        { text: prod.totalDaNota, fontSize: 8 },
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.dataVencimentoPedido, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 7,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarRelatorioVencimentoDiario(corpoDocumento, tituloRelatorio) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: tituloRelatorio, style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: [150, 50, 50, 50, 100, 50, 70],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }

  // Pedidos realizados no dia
  async relatorioListaPedidosDoDia() {
    const corpoDocumento = this.CriarRelatorioListaPedidosDoDia();
    const documento = this.GerarRelatorioListaPedidosDoDia(corpoDocumento, 'RELATÓRIO PEDIDOS REALIZADOS DO DIA');
    return documento;
  }

  CriarRelatorioListaPedidosDoDia() {
    const header = [
      { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.name, fontSize: 8 },
        { text: prod.quilo, fontSize: 8 },
        { text: prod.valor, fontSize: 8 },
        { text: prod.desconto, fontSize: 8 },
        { text: prod.totalDaNota, fontSize: 8 },
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.dataVencimentoPedido, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 7,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarRelatorioListaPedidosDoDia(corpoDocumento, tituloRelatorio) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: tituloRelatorio, style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: [150, 50, 50, 50, 100, 50, 70],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }

  // Pedidos cadastrados no dia
  async relatorioPedidosCadastradosHoje() {
    const corpoDocumento = this.CriarRelatorioPedidosCadastradosHoje();
    const documento = this.GerarRelatorioPedidosCadastradosHoje(corpoDocumento, 'RELATÓRIO PEDIDOS CADASTRADOS DO DIA');
    return documento;
  }

  CriarRelatorioPedidosCadastradosHoje() {
    const header = [
      { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.name, fontSize: 8 },
        { text: prod.quilo, fontSize: 8 },
        { text: prod.valor, fontSize: 8 },
        { text: prod.desconto, fontSize: 8 },
        { text: prod.totalDaNota, fontSize: 8 },
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.dataVencimentoPedido, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 7,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarRelatorioPedidosCadastradosHoje(corpoDocumento, tituloRelatorio) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: tituloRelatorio, style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: [150, 50, 50, 50, 100, 50, 70],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }

  // Pedidos Pedidos entre datas
  async relatorioPorIntervaloDataDoPedido() {
    const corpoDocumento = this.CriarRelatorioPorIntervaloDataDoPedido();
    const documento = this.GerarRelatorioPorIntervaloDataDoPedido(corpoDocumento, 'RELATÓRIO PEDIDOS ENTRE DATAS');
    return documento;
  }

  CriarRelatorioPorIntervaloDataDoPedido() {
    const header = [
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Frangos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Situação', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.name, fontSize: 8 },
        { text: prod.valor, fontSize: 8 },
        { text: prod.dataVencimentoPedido, fontSize: 8 },
        { text: prod.quant_frango, fontSize: 8 },
        { text: prod.quilo, fontSize: 8 },
        { text: prod.desconto, fontSize: 8 },
        { text: prod.totalDaNota, fontSize: 8 },
        { text: prod.situacao, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 9,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarRelatorioPorIntervaloDataDoPedido(corpoDocumento, tituloRelatorio) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: tituloRelatorio, style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: [50, 50, 50, 75, 50, 50, 60, 50, 70],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }

  // Pedidos Pedidos entre datas por cliente
  async relatorioPorIntervaloDataDoPedidoPorCliente() {
    const corpoDocumento = this.CriarRelatorioPorIntervaloDataDoPedidoPorCliente();
    const documento = this.GerarRelatorioPorIntervaloDataDoPedidoPorCliente(corpoDocumento, 'RELATÓRIO PEDIDOS POR CLIENTE ENTRE DATAS');
    return documento;
  }

  CriarRelatorioPorIntervaloDataDoPedidoPorCliente() {
    const header = [
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Frangos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Situação', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.name, fontSize: 8 },
        { text: prod.dataVencimentoPedido, fontSize: 8 },
        { text: prod.quant_frango, fontSize: 8 },
        { text: prod.valor, fontSize: 8 },
        { text: prod.quilo, fontSize: 8 },
        { text: prod.desconto, fontSize: 8 },
        { text: prod.situacao, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 8,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarRelatorioPorIntervaloDataDoPedidoPorCliente(corpoDocumento, tituloRelatorio) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: tituloRelatorio, style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: [50, 75, 50, 75, 75, 80, 50, 70],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }

  // Custos com frete
  async relatorioCustoComFrete() {
    const corpoDocumento = this.CriarRelatorioCustoComFrete();
    const documento = this.GerarRelatorioCustoComFrete(corpoDocumento, 'RELATÓRIO CUSTO COM FRETE ENTRE DATAS');
    return documento;
  }

  CriarRelatorioCustoComFrete() {
    const header = [
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Frete', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.quilo, fontSize: 8 },
        { text: prod.frete, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 3,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarRelatorioCustoComFrete(corpoDocumento, tituloRelatorio) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: tituloRelatorio, style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }

  // Carregamento
  async relatorioPedidosParaCarregamento() {
    const corpoDocumento = this.CriarRelatorioPedidosParaCarregamento();
    const documento = this.GerarRelatorioPedidosParaCarregamento(corpoDocumento, 'ORDEM DE CARREGAMENTO');
    return documento;
  }

  CriarRelatorioPedidosParaCarregamento() {
    const header = [
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Frangos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Caixas', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.name, fontSize: 8 },
        { text: prod.quant_frango, fontSize: 8 },
        { text: prod.quant_caixa, fontSize: 8 },
      ];
    });
    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 4,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarRelatorioPedidosParaCarregamento(corpoDocumento, tituloRelatorio) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: tituloRelatorio, style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }

  async PreparaDocumento() {
    const corpoDocumento = this.CriaCorpoDocumento();
    const documento = this.GerarDocumento(corpoDocumento, 'RELATÓRIO DE COBRANÇA DIARIA');
    return documento;
  }

  CriaCorpoDocumento() {
    const header = [
      { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.name, fontSize: 8 },
        { text: prod.quilo, fontSize: 8 },
        { text: prod.valor, fontSize: 8 },
        { text: prod.desconto, fontSize: 8 },
        { text: prod.totalDaNota, fontSize: 8 },
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.dataVencimentoPedido, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 7,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarDocumento(corpoDocumento, tituloRelatorio) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: tituloRelatorio, style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: [150, 50, 50, 50, 100, 50, 70],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }
}