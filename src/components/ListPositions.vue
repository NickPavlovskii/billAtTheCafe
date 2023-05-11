<template>
    <div>
      <h2>Результаты</h2>
      <table>
        <thead>
          <tr>
            <th>Персона</th>
            <th>Позиция</th>
            <th>Цена</th>
            
            <th>Стоимость</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in people" :key="index">
            <td>{{ person.name }}</td>
            <td>
              <ul>
                <li v-for="position in positions" :key="position.id">
                  {{ position.name }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="position in positions" :key="position.id">
                  {{ position.price }}р
                </li>
              </ul>
            </td>
           
            <td>
              <ul>
                <li v-for="position in positions" :key="position.id">
                  {{ position.price / position.peopleEaten.length }}р
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      positions: {
        type: Array,
        required: true,
      },
      people: {
        type: Array,
        required: true,
      },
    },
  };
  </script>