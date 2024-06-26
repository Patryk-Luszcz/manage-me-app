import { SanitizeTitlePipe } from './sanitize-title.pipe';

describe('SanitizeTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
