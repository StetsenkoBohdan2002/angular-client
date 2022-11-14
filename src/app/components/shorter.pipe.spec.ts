import { ShorterPipe } from './shorter.pipe';

describe('ShorterPipe', () => {
  const pipe = new ShorterPipe();
  let words = [
    'Hello',
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC',
  ];
  beforeEach(() => {});
  it('should transforms big sentence to shorter up to 10 characters', () => {
    console.log(pipe.transform(words[1], 10));
    expect(pipe.transform(words[1], 10)).toBe('Contrary t...');
  });
  it('should not transforms small word', () => {
    expect(pipe.transform(words[0], 10)).toBe('Hello');
  });
});
