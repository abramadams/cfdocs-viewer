component {
    this.name = hash(GetCurrentTemplatePath());
    this.mappings['/'] = expandPath('/');
}