import Team from '../Team';
import Character from '../Character';
import Bowerman from '../Bowerman';
import Swordsman from '../Swordsman';
import Magician from '../Magician';
import Deamon from '../Deamon';
import Undead from '../Undead';
import Zombie from '../Zombie';

const bowerman = new Bowerman('Bob', 'bowerman');
const swordsman = new Swordsman('Larry', 'swordsman');
const magician = new Magician('Gina', 'magician');
const deamon = new Deamon('Joe', 'deamon');
const undead = new Undead('Loo', 'undead');
const zombie = new Zombie('Ralph', 'zombie');

test('correctAdd', () => {
  const team = new Team();
  team.add(swordsman);
  const object = new Set([swordsman]);
  expect(team.members).toEqual(object);
});

test('notCorrectAdd', () => {
  const team = new Team();
  team.add(swordsman);
  expect(() => team.add(swordsman)).toThrowError('Такой персонаж уже есть');
});

test('correctAddAll', () => {
  const team = new Team();
  team.addAll([bowerman, swordsman, magician, deamon, undead, zombie]);
  const object = new Set([bowerman, swordsman, magician, deamon, undead, zombie]);

  expect(team.members).toEqual(object);
});

test('notCorrectAddAll', () => {
  const team = new Team();
  team.addAll([swordsman, swordsman, zombie, deamon, undead, zombie]);
  const object = new Set([swordsman, deamon, undead, zombie]);

  expect(team.members).toEqual(object);
});

test('toArray', () => {
  const team = new Team();
  team.addAll([bowerman, swordsman, magician, deamon, undead, zombie]);
  expect(team.toArray()).toEqual([bowerman, swordsman, magician, deamon, undead, zombie]);
});

// проверки из предыдущих домашек, чтобы Jest показывал 100% покрытие тестами
test('Character', () => {
  const result = new Character('Edgar', 'bowerman');
  const expectation = {
    name: 'Edgar',
    type: 'bowerman',
    health: 100,
    level: 1,
  };

  expect(result).toEqual(expectation);
});

test('lengthOfName', () => {
  expect(() => new Bowerman('E', 'bowerman')).toThrowError(
    'Некорректная длина имени',
  );
});

test('typeOfUnit', () => {
  expect(() => new Bowerman('Edgar', 'archer')).toThrowError(
    'Некорректный тип юнита',
  );
});

test('levelUp', () => {
  const bowerman1 = new Bowerman('Edgar', 'bowerman');
  bowerman1.levelUp();
  const expectation = {
    name: 'Edgar',
    type: 'bowerman',
    health: 100,
    level: 2,
    attack: 25 * 1.2,
    defence: 25 * 1.2,
  };
  expect(bowerman1).toEqual(expectation);
});

test('notLevelUp', () => {
  const bowerman1 = new Bowerman('Edgar', 'bowerman');
  bowerman1.health = 0;

  expect(() => bowerman1.levelUp()).toThrowError(
    'нельзя повысить левел умершего',
  );
});

test('damage', () => {
  const bowerman1 = new Bowerman('Edgar', 'bowerman');
  bowerman1.damage(30);

  expect(bowerman1.health).toBe(77.5);
});

test('notDamage', () => {
  const bowerman1 = new Bowerman('Edgar', 'bowerman');
  bowerman1.health = -1;
  bowerman1.damage(30);

  expect(bowerman1.health).toBe(-1);
});
