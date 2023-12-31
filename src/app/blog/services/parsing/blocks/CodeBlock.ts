import { Resources } from '../resources/Resources';
import { ParsingRule } from '../rules/ParsingRule';
import { BlockType } from '../blocks/BlockType';
import { Block } from './Block';

export class CodeBlock extends Block {
  constructor(lines: string[]) {
    super(lines, BlockType.CODE);
  }

  public override build(blockCount: number): string[] {
    let result = new Array<string>();
    result.push(
      `<div class="code"> <button class="copy-button" onclick="CopyToClipboard('codeblock${blockCount}')">Copy code</button><pre id="codeblock${blockCount}">`
    );
    for (let i = 0; i < this.lines.length; i++) {
      const element = this.lines[i];
      if (element == '<code>' || element == '</code>') continue;
      let parsed = this.processCodeLine(element);
      for (let kvp of this.keysWithReplacers) {
        parsed = parsed.replace(kvp[0], kvp[1]);
      }
      result.push(parsed);

      this.keysWithReplacers.clear();
    }
    result.push('</pre></div>');
    return result;
  }

  processCodeLine(line: any): string {
    for (let rule of Resources.rules) {
      line = this.processLine(line, rule);
    }
    return line;
  }

  public keysWithReplacers: Map<string, string> = new Map<string, string>();

  private processLine(line: string, rule: ParsingRule): string {
    line = rule.processLine(line);

    for (let kvp of rule.keysWithReplacers) {
      this.keysWithReplacers.set(kvp[0], kvp[1]);
    }
    return line;
  }
}
