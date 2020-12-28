import React from 'react';

const BezgotovinskiPorezi = () => {
  return (
    <>
      <h2 class="heading-secondary">Porez pojedinačno</h2>
      <div class="main-content__box">
        <div class="content">
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th class="w-33">
                    <span class="heading-quaternary">PDV stopa</span>
                  </th>
                  <th class="w-33">
                    <span class="heading-quaternary">osnovica</span>
                  </th>
                  <th class="w-33">
                    <span class="heading-quaternary">iznos poreza</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="w-33">PDV 7%</td>
                  <td class="w-33">120,30</td>
                  <td class="txt-right w-33">
                    12,00 <span class="txt-light">EUR</span>
                  </td>
                </tr>
                <tr>
                  <td class="w-33">PDV 21%</td>
                  <td class="w-33">230,40</td>
                  <td class="txt-right w-33">
                    42,40 <span class="txt-light">EUR</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BezgotovinskiPorezi;
